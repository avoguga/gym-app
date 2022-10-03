import { useContext } from "react";
import {
  FooterContainer,
  SoundButton,
  PauseButton,
  StopButton,
  Text,
  SocialMedia,
  SoundSection
} from "./styles";
import { Context } from "../../contexts/AppContext";

export function Footer() {
  const { userName, isDale, playSound, pauseSound, stopSound }: any =
    useContext(Context);

  return (
    <FooterContainer isDale={isDale}>
   
      <SocialMedia>
        <Text>Acesse as redes:</Text>
        <br />
        <a href="https://www.linkedin.com/" target="_blank">
          <img
            src="https://www.svgrepo.com/show/138936/linkedin.svg"
            alt="Acesse o LinkedIn"
            style={{ width: "40px" }}
          />
        </a>
        <a href="https://twitter.com/" target="_blank">
          <img
            src="https://www.svgrepo.com/show/157815/twitter.svg"
            alt="Acesse o Twitter"
            style={{ width: "40px" }}
          />
        </a>
        <a href="https://www.instagram.com/" target="_blank">
          <img
            src="https://www.svgrepo.com/show/217758/instagram.svg"
            alt="Acesse o Instagram"
            style={{ width: "40px" }}
          />
        </a>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;
