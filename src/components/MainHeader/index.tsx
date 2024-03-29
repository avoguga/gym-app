import {
  HeaderContainer,
  FirstSectionDiv,
  SecondSectionDiv,
  ThirdSectionDiv,
  Text,
} from "./styles";
import { useContext } from "react";
import { Context } from "../../contexts/AppContext";


export function MainHeader() {
  const { userName, userProfile, signInWithGoogle, isUserLogIn, isDale }: any =
    useContext(Context);

  return (
    <HeaderContainer isDale={isDale}>
      <FirstSectionDiv>
        <Text style={{fontSize: "30px", margin: "10px", marginLeft: "30px"}}>GymApp</Text>
      </FirstSectionDiv>
      <SecondSectionDiv />
      <ThirdSectionDiv>
      <a href="https://acesso.cesmac.edu.br/abertura" target="_blank">
          <img
            src="https://portalaluno.cesmac.edu.br/FrameHTML/web/app/Edu/PortalEducacional/login/assets/img/logo-responsivo.png"
            alt="CESMAC"
            style={{ width: "130px", marginRight: "30px" }}
          />
        </a>
      </ThirdSectionDiv>
    </HeaderContainer>
  );
}

export default MainHeader;
