import React from "react";
import { TitleBar, Cursor } from "@react95/core";
import { Textchat } from "@react95/icons";
import * as S from "./layoutStyling";

function About({ closeAboutModal }) {
  return (
    <S.styledModal
      icon={<Textchat variant="16x16_4" />}
      title={"About FHE Rock-Paper-Scissors"}
      style={{ left: '10%' }}
      titleBarOptions={[
        <TitleBar.Close onClick={closeAboutModal} key="close" />,
      ]}
    >
      <S.styledModalFrame bg="white" boxShadow="$in">
      <h1>🎮 Project E 🪨</h1>
                <p>
                <h3> 【 Welcome to FHE Rock-Paper-Scissors 95 System 】</h3>
                <h3>  Brave players, come experience encrypted gaming</h3>
                </p>

                <p>
                    The purpose of this system is to experience Fully Homomorphic Encryption gaming 🎲 . . . . . .
                    <br/>
                    To experience FHE Rock-Paper-Scissors, you need:
                    <ul>
                        <li><b>🔒Privacy-Protected Encrypted Gaming</b>:<br/>
                        Using FHE technology, your choices remain completely confidential during gameplay - opponents cannot know your move!</li>
                        <li><b>🎲Three Move Options</b>:<br/>
                        Rock, Paper, Scissors - classic rock-paper-scissors game rules, enhanced with blockchain and homomorphic encryption technology</li>
                        <li><b>🚀Smart Contract Auto-Judgment</b>:<br/>
                        Deployed on Sepolia testnet, smart contracts automatically determine winners - fair and just!</li>
                    </ul>
                </p>
      </S.styledModalFrame>
    </S.styledModal>
  );
}

export default About;
