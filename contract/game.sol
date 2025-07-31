// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint8, externalEuint8, ebool} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

contract RockPaperScissors is SepoliaConfig {
    
    enum GameStatus { Created, Completed }
    enum Choice { Rock, Paper, Scissors }
    enum Result { Draw, Player1Win, Player2Win }
    
    struct Game {
        address player1;
        address player2;
        euint8 player1Choice;
        euint8 player2Choice;
        GameStatus status;
        uint256 createdAt;
    }
    
    struct PlayerStats {
        uint256 wins;
        uint256 losses;
        uint256 draws;
    }
    
    mapping(uint256 => Game) public games;
    mapping(address => PlayerStats) public playerStats;
    mapping(address => uint256[]) public playerGames;
    mapping(uint256 => uint256) public pendingGames;
    
    uint256 public gameCounter;
    uint256[] public openGames;
    
    event GameCreated(uint256 indexed gameId, address indexed player1);
    event GameJoined(uint256 indexed gameId, address indexed player2);
    event GameCompleted(uint256 indexed gameId, Result result);
    
    function createGame(externalEuint8 choice, bytes calldata choiceProof) external {
        gameCounter++;
        euint8 encryptedChoice = FHE.fromExternal(choice, choiceProof);
        
        games[gameCounter] = Game({
            player1: msg.sender,
            player2: address(0),
            player1Choice: encryptedChoice,
            player2Choice: FHE.asEuint8(0),
            status: GameStatus.Created,
            createdAt: block.timestamp
        });
        
        openGames.push(gameCounter);
        playerGames[msg.sender].push(gameCounter);
        
        FHE.allowThis(encryptedChoice);
        FHE.allow(encryptedChoice, msg.sender);
        
        emit GameCreated(gameCounter, msg.sender);
    }
    
    function joinGame(uint256 gameId, externalEuint8 choice, bytes calldata choiceProof) external {
        Game storage game = games[gameId];
        require(game.player1 != address(0), "Game does not exist");
        require(game.player2 == address(0), "Game already joined");
        require(game.player1 != msg.sender, "Cannot join own game");
        require(game.status == GameStatus.Created, "Game not available");
        
        euint8 encryptedChoice = FHE.fromExternal(choice, choiceProof);
        game.player2 = msg.sender;
        game.player2Choice = encryptedChoice;
        game.status = GameStatus.Completed;
        
        playerGames[msg.sender].push(gameId);
        
        _removeFromOpenGames(gameId);
        
        FHE.allowThis(encryptedChoice);
        FHE.allow(encryptedChoice, msg.sender);
        
        bytes32[] memory cts = new bytes32[](2);
        cts[0] = FHE.toBytes32(game.player1Choice);
        cts[1] = FHE.toBytes32(encryptedChoice);
        
        uint256 requestId = FHE.requestDecryption(cts, this.gameResultCallback.selector);
        pendingGames[requestId] = gameId;
        
        emit GameJoined(gameId, msg.sender);
    }
    
    function gameResultCallback(uint256 requestId, uint8 choice1, uint8 choice2, bytes[] memory signatures) public returns (bool) {
        FHE.checkSignatures(requestId, signatures);
        
        uint256 gameId = pendingGames[requestId];
        require(gameId != 0, "Invalid request ID");
        
        Game storage game = games[gameId];
        
        Result result = _calculateWinner(choice1, choice2);
        _updateStats(game.player1, game.player2, result);
        
        delete pendingGames[requestId];
        
        emit GameCompleted(gameId, result);
        return true;
    }
    
    function _calculateWinner(uint8 choice1, uint8 choice2) private pure returns (Result) {
        if (choice1 == choice2) {
            return Result.Draw;
        }
        
        bool player1Wins = (choice1 == 0 && choice2 == 2) || 
                          (choice1 == 1 && choice2 == 0) || 
                          (choice1 == 2 && choice2 == 1);
        
        return player1Wins ? Result.Player1Win : Result.Player2Win;
    }
    
    function _updateStats(address player1, address player2, Result result) private {
        if (result == Result.Draw) {
            playerStats[player1].draws++;
            playerStats[player2].draws++;
        } else if (result == Result.Player1Win) {
            playerStats[player1].wins++;
            playerStats[player2].losses++;
        } else {
            playerStats[player1].losses++;
            playerStats[player2].wins++;
        }
    }
    
    function _removeFromOpenGames(uint256 gameId) private {
        for (uint256 i = 0; i < openGames.length; i++) {
            if (openGames[i] == gameId) {
                openGames[i] = openGames[openGames.length - 1];
                openGames.pop();
                break;
            }
        }
    }
    
    function getOpenGames() external view returns (uint256[] memory) {
        return openGames;
    }
    
    function getPlayerGames(address player) external view returns (uint256[] memory) {
        return playerGames[player];
    }
    
    function getPlayerStats(address player) external view returns (uint256 wins, uint256 losses, uint256 draws) {
        PlayerStats memory stats = playerStats[player];
        return (stats.wins, stats.losses, stats.draws);
    }
    
    function getGameDetails(uint256 gameId) external view returns (
        address player1,
        address player2,
        GameStatus status,
        uint256 createdAt
    ) {
        Game memory game = games[gameId];
        return (game.player1, game.player2, game.status, game.createdAt);
    }
}