import React from "react";
import { List, Frame, Cursor, TaskBar, TitleBar } from "@react95/core";
import Janne_pixelated from "../assets/janne_pixelated.png";
import Shortcuts from "./desktopIcons";
import * as S from "./layoutStyling";
import "./styles.scss";
import { BatExec2, User, CdMusic, Progman34, Textchat, HelpBook, Filexfer128 } from "@react95/icons";
import Portfolio from "./portfolio";
import CV from "./cv";
import Tunes from "./tunes";
import About from "./about";
import Skills from "./skills";
import Paint from "./paint";
import useModal from "./useModal";

function Desktop() {
  const [showAboutModal, handleOpenAboutModal, handleCloseAboutModal] = useModal(false);
  const [showSkillsModal, handleOpenSkillsModal, handleCloseSkillsModal] = useModal(false);
  const [showPhotoModal, handleOpenPhotoModal, handleClosePhotoModal] = useModal(false);
  const [showVaporwaveModal, handleOpenVaporwaveModal, handleCloseVaporwaveModal] = useModal(false);
  const [showPortfolioModal, handleOpenPortfolioModal, handleClosePortfolioModal] = useModal(false);
  const [showCVModal, handleOpenCVModal, handleCloseCVModal] = useModal(false);
  const [showTunesModal, handleOpenTunesModal, handleCloseTunesModal] = useModal(false);
  const [showPaintModal, handleOpenPaintModal, handleClosePaintModal] = useModal(false);

  const socialMedia = [
    {
      id: 0,
      name: "Twitter",
      url: "https://x.com/0xNezha",
    },
    {
      id: 1,
      name: "Github",
      url: "https://github.com/0xNezha",
    },
    {
      id: 2,
      name: "Discord",
      url: "https://discord.com",
    },
  ];

  return (
    <>
      <TaskBar
        list={
          <List width={"200px"}>
            <List.Item
              className="listLink"
              icon={<Progman34 variant="32x32_4" />}
            >
              Technical Support
              <List>
                {socialMedia.map(({ id, name, url }) => (
                  <a
                    className="listLink"
                    as="a"
                    target="_blank"
                    href={url}
                    key={id}
                  >
                    <List.Item className={`${Cursor.Pointer} listLink`}>{name}</List.Item>
                  </a>
                ))}
              </List>
            </List.Item>
            <List.Item
              icon={<CdMusic variant="32x32_4" />}
              className="listLink"
            >
              Tunes
              <List width={"200px"}>
                <List.Item
                  onClick={handleOpenVaporwaveModal}
                  icon={<CdMusic variant="16x16_4" />}
                  className="listLink"
                >
                  Janne's Vaporwave Story from 2018
                </List.Item>
                <List.Item
                  onClick={handleOpenTunesModal}
                  icon={<CdMusic variant="16x16_4" />}
                  className="listLink"
                >
                  Janne's Ultimate House Playlist on Spotify
                </List.Item>
              </List>
            </List.Item>
            <List.Item
              icon={<Filexfer128 variant="32x32_4" />}
              onClick={handleOpenCVModal}
              className="listLink"
            >
              Connect Wallet{" "}
            </List.Item>
            <List.Item
              icon={<HelpBook variant="32x32_4" />}
              onClick={handleOpenPortfolioModal}
              className="listLink"
            >
              System Guide{" "}
            </List.Item>
            <List.Item
              icon={<User variant="32x32_4" />}
              onClick={handleOpenPhotoModal}
              className="listLink"
            >
              User Interface
            </List.Item>
            <List.Item
              icon={<BatExec2 variant="32x32_4" />}
              onClick={handleOpenSkillsModal}
              className="listLink"
            >
              Rock-Paper-Scissors
            </List.Item>
            <List.Divider />
            <List.Item
              icon={<Textchat variant="32x32_4" />}
              onClick={handleOpenAboutModal}
              className="listLink"
            >
              About System
            </List.Item>
          </List>
        }
      />

      <Shortcuts
        openPortfolio={handleOpenPortfolioModal}
        openCV={handleOpenCVModal}
        openSkills={handleOpenSkillsModal}
        openTunes={handleOpenTunesModal}
        openPaint={handleOpenPaintModal}
      />
      {showAboutModal && <About closeAboutModal={handleCloseAboutModal} />}
      {showSkillsModal && <Skills closeSkillsModal={handleCloseSkillsModal} />}
      {showPhotoModal && (
        <S.styledModal
          title={"janne_compressed_for_web.jpeg"}
          titleBarOptions={
            <TitleBar.Close
              onClick={handleClosePhotoModal}
              key="close"
            />
          }
          icon={<User variant="16x16_4" />}
        >
          <Frame
            boxShadow="none"
            className="fullWidthImage"
          >
            <img
              src={Janne_pixelated}
              aria-hidden
              alt="Janne as a pixelated image"
              className="fullWidthImage"
            ></img>
          </Frame>
        </S.styledModal>
      )}
      {showVaporwaveModal && (
        <S.styledModal
          height="100%"
          icon={<CdMusic variant="16x16_4" />}
          width={340}
          title="My_Alter_Ego.doc"
          titleBarOptions={[
            <TitleBar.Close
              onClick={handleCloseVaporwaveModal}
              key="close"
            />,
          ]}
        >
          <S.styledModalFrame
            bg="white"
            boxShadow="$in"
          >
            <h1>A Vaporwave Album</h1>
            <p>In 2018 I took part in a workshop in Lithuania at the Vilnius Art Academy in producing a Vaporwave Album with participants coming in from around Europe.</p>
            <p>Over the course of the weekend we produced music videos, songs and more. I produced two songs for the album and a music video. The album can be found on streaming services.</p>
            <a
              className={Cursor.Pointer}
              target="_blank"
              href="https://open.spotify.com/album/0pCqTDsI4zOZXZJnxx2yPT?si=JW5qpLJJQsO3eK2m65FQBQ"
            >
              The album on Spotify
            </a>
            <hr
              color="gray"
              align="left"
              width="100%"
            />
            <div>
              <iframe
                src="https://www.youtube.com/embed/7SyxEF-QG_M"
                width="100%"
                height={500}
                title="A Song from a Vaporwave Album"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </S.styledModalFrame>
        </S.styledModal>
      )}
      {showPortfolioModal && <Portfolio closePortfolio={handleClosePortfolioModal} />}
      {showCVModal && <CV closeCV={handleCloseCVModal} />}
      {showTunesModal && <Tunes closeTunes={handleCloseTunesModal} />}
      {showPaintModal && <Paint closePaint={handleClosePaintModal} />}
    </>
  );
}

export default Desktop;
