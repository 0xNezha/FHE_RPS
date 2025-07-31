import React from "react";
import { TitleBar, Cursor } from "@react95/core";
import { HelpBook } from "@react95/icons";
import * as S from "./layoutStyling";

function Portfolio({ closePortfolio }) {
  return (
    <S.styledModal
      title="FHE Rock-Paper-Scissors User Guide"
      titleBarOptions={[
        <S.styledModal.Minimize key="minimize" />,
        <TitleBar.Close onClick={closePortfolio} key="close" />,
      ]}
      height="100%"
      icon={<HelpBook variant="16x16_4" />}
    >
      <S.styledModalFrame bg="white" boxShadow="$in">
      <h1>FHE Rock-Paper-Scissors 95 User Guide</h1>
                <p>         
                    <ul>
                        <li><b>1. Connect MetaMask or other Ethereum wallet</b><br/>
                        Ensure your wallet is connected to the Sepolia test network</li>
                        <li><b>2. Obtain test ETH</b><br/>
                        Get free test ETH from Sepolia faucet to pay for gas fees</li>
                        <li><b>3. Click "Rock-Paper-Scissors Game" to start</b><br/>
                        System will automatically initialize FHE encryption client</li>
                        <li><b>4. Choose your move (Rock/Paper/Scissors)</b><br/>
                        Your choice will be FHE encrypted - opponents cannot know it</li>
                        <li><b>5. Create game or join existing game</b><br/>
                        After opponent joins, smart contract will automatically determine winner</li>
                        <li><b>6. View game results and history</b><br/>
                        Check all your game records in the game list</li>
                    </ul>
                </p>
                
                <h2>🔒 FHE Technology Introduction</h2>
                <p>
                    <b>Fully Homomorphic Encryption (FHE)</b> is a cryptographic technique that allows computation directly on encrypted data.<br/>
                    In this game:
                    <ul>
                        <li>Your move choice remains encrypted throughout the game</li>
                        <li>Smart contracts can compare two players' choices without decryption</li>
                        <li>Final results are only revealed when the game ends</li>
                        <li>This ensures game fairness and unpredictability</li>
                    </ul>
                </p>
      </S.styledModalFrame>
    </S.styledModal>
  );
}

export default Portfolio;
