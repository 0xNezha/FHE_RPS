import React, { useState, useEffect } from "react";
import { TitleBar, Button, Frame } from "@react95/core";
import { BatExec2 } from "@react95/icons";
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
// import { initSDK, createInstance, SepoliaConfig } from "@zama-fhe/relayer-sdk/web";
import contractABI from '../../contract/abi.json';
import * as S from "./layoutStyling";

const CONTRACT_ADDRESS = '0x51f37B180D03d3c95D75879c86BbAB043C691B22';
const CONTRACT_ABI = contractABI.abi;

function Skills({ closeSkillsModal }) {
  const { address, isConnected } = useAccount();
  const [choice, setChoice] = useState(null);
  const [fheInstance, setFheInstance] = useState(null);
  const [openGames, setOpenGames] = useState([]);
  const [playerGames, setPlayerGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { writeContract } = useWriteContract();

  const { data: openGamesData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getOpenGames',
  });

  const { data: playerGamesData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerGames',
    args: [address],
    enabled: !!address,
  });

  useEffect(() => {
    // const init = async () => {
    //   try {
    //     await initSDK();
    //     const config = { ...SepoliaConfig, network: window.ethereum };
    //     const instance = await createInstance(config);
    //     setFheInstance(instance);
    //   } catch (err) {
    //     setError('Failed to initialize FHE: ' + err.message);
    //   }
    // };
    // init();
  }, []);

  useEffect(() => {
    if (openGamesData) {
      setOpenGames(openGamesData);
    }
  }, [openGamesData]);

  useEffect(() => {
    if (playerGamesData) {
      setPlayerGames(playerGamesData);
    }
  }, [playerGamesData]);

  const createGame = async () => {
    if (!fheInstance || choice === null) return;
    
    setLoading(true);
    setError('');
    
    try {
      const input = fheInstance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add8(choice);
      const encryptedInput = await input.encrypt();
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createGame',
        args: [encryptedInput.handles[0], encryptedInput.inputProof],
      });
    } catch (err) {
      setError('Failed to create game: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const joinGame = async (gameId) => {
    if (!fheInstance || choice === null) return;
    
    setLoading(true);
    setError('');
    
    try {
      const input = fheInstance.createEncryptedInput(CONTRACT_ADDRESS, address);
      input.add8(choice);
      const encryptedInput = await input.encrypt();
      
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'joinGame',
        args: [gameId, encryptedInput.handles[0], encryptedInput.inputProof],
      });
    } catch (err) {
      setError('Failed to join game: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getChoiceText = (choiceNum) => {
    switch(choiceNum) {
      case 0: return '🪨 Rock';
      case 1: return '📄 Paper';
      case 2: return '✂️ Scissors';
      default: return 'Not Selected';
    }
  };

  return (
    <S.styledModal
      className="styledModal"
      title={"Rock-Paper-Scissors Game"}
      titleBarOptions={[
        <S.styledModal.Minimize key="minimize" />,
        <TitleBar.Close onClick={closeSkillsModal} key="close" />,
      ]}
      height="100%"
      icon={<BatExec2 variant="16x16_4" />}
    >
      <S.styledModalFrame bg="white" boxShadow="$in">
        <Frame
          bg="white"
          boxShadow="in"
          height="100%"
          padding={20}
          style={{
            overflowY: "auto",
            maxHeight: "60vh",
          }}
        >
          {!isConnected ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>Please Connect Wallet First</h3>
              <p>Connect MetaMask or other wallets to start the game</p>
            </div>
          ) : (
            <div>
              <h2>🎮 FHE Rock-Paper-Scissors</h2>
              
              {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  Error: {error}
                </div>
              )}
              
              <div style={{ marginBottom: '20px' }}>
                <h3>Choose Your Move:</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <Button 
                    onClick={() => setChoice(0)} 
                    variant={choice === 0 ? 'raised' : 'default'}
                    disabled={loading}
                  >
                    🪨 Rock
                  </Button>
                  <Button 
                    onClick={() => setChoice(1)} 
                    variant={choice === 1 ? 'raised' : 'default'}
                    disabled={loading}
                  >
                    📄 Paper
                  </Button>
                  <Button 
                    onClick={() => setChoice(2)} 
                    variant={choice === 2 ? 'raised' : 'default'}
                    disabled={loading}
                  >
                    ✂️ Scissors
                  </Button>
                </div>
                <p>Current Choice: {getChoiceText(choice)}</p>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <Button 
                  onClick={createGame} 
                  disabled={choice === null || loading || !fheInstance}
                  variant="raised"
                >
                  {loading ? 'Creating...' : 'Create New Game'}
                </Button>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h3>Available Games ({openGames.length}):</h3>
                {openGames.length === 0 ? (
                  <p>No games available to join</p>
                ) : (
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {openGames.map((gameId) => (
                      <div key={gameId.toString()} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '5px 0',
                        borderBottom: '1px solid #ccc'
                      }}>
                        <span>Game #{gameId.toString()}</span>
                        <Button 
                          onClick={() => joinGame(gameId)} 
                          disabled={choice === null || loading || !fheInstance}
                          size="sm"
                        >
                          {loading ? 'Joining...' : 'Join Game'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <h3>My Game History ({playerGames.length}):</h3>
                {playerGames.length === 0 ? (
                  <p>No game history</p>
                ) : (
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {playerGames.map((gameId) => (
                      <div key={gameId.toString()} style={{ 
                        padding: '5px 0',
                        borderBottom: '1px solid #ccc'
                      }}>
                        Game #{gameId.toString()}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <p>📝 Game Instructions:</p>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Uses FHE encryption technology to protect your choices</li>
                  <li>After creating a game, wait for other players to join</li>
                  <li>Game results are automatically calculated by smart contract</li>
                  <li>Contract Address: {CONTRACT_ADDRESS}</li>
                </ul>
              </div>
            </div>
          )}
        </Frame>
      </S.styledModalFrame>
    </S.styledModal>
  );
}

export default Skills;
