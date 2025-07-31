import React from "react";
import { Cursor } from "@react95/core";
import "./styles.scss";
import { Filexfer128, BatExec2, HelpBook, CdMusic, Mspaint } from "@react95/icons";

function Shortcuts({ openPortfolio, openCV, openSkills, openTunes, openPaint }) {
  return (
    <div style={{ width: 100, marginLeft: 10, marginTop: 10 }}>
      <div className={Cursor.Pointer} onClick={() => openPortfolio()}>
        <HelpBook
          variant="32x32_4"
          style={{ marginLeft: 32, marginTop: 15 }}
        />
        <p
          style={{
            fontFamily: "MS Sans Serif",
            fontSize: 13,
            justifyContent: "center",
            marginTop: 5,
            width: 100,
            textAlign: "center",
            color: "black",
          }}
        >
          System Guide
        </p>
      </div>
      <div className={Cursor.Pointer} onClick={() => openCV()}>
        <Filexfer128
          variant="32x32_4"
          style={{ marginLeft: 32, marginTop: 15 }}
        />
        <p
          style={{
            fontFamily: "MS Sans Serif",
            fontSize: 13,
            justifyContent: "center",
            marginTop: 5,
            width: 100,
            textAlign: "center",
            color: "black",
          }}
        >
          Connect Wallect
        </p>
      </div>
      <div className={Cursor.Pointer} onClick={() => openSkills()}>
        <BatExec2
          variant="32x32_4"
          style={{ marginLeft: 32, marginTop: 15 }}
        />
        <p
          style={{
            fontFamily: "MS Sans Serif",
            fontSize: 13,
            justifyContent: "center",
            marginTop: 5,
            width: 100,
            textAlign: "center",
            color: "black",
          }}
        >
          Rock-Paper-Scissors
        </p>
      </div>
      <div className={Cursor.Pointer} onClick={() => openTunes()}>
        <CdMusic variant="32x32_4" style={{ marginLeft: 32, marginTop: 15 }} />
        <p
          style={{
            fontFamily: "MS Sans Serif",
            fontSize: 13,
            justifyContent: "center",
            marginTop: 5,
            width: 100,
            textAlign: "center",
            color: "black",
          }}
        >
          Tunes
        </p>
      </div>
      <div className={Cursor.Pointer} onClick={() => openPaint()}>
        <Mspaint variant="32x32_4" style={{ marginLeft: 32, marginTop: 15 }} />
        <p
          style={{
            fontFamily: "MS Sans Serif",
            fontSize: 13,
            justifyContent: "center",
            marginTop: 5,
            width: 100,
            textAlign: "center",
            color: "black",
          }}
        >
          Paint
        </p>
      </div>
    </div>
  );
}

export default Shortcuts;
