import React, { createRef, useRef, useState } from "react";
import { useScreenshot } from "use-react-screenshot";
import New from "../../DragglableContainer/new";
import { ImgContainer, ImgTextContainer, MainContainer, SendWorkoutButton, UploadedImg } from "./styles";
import ImgIcon from "../../../assets/img-icon.jpeg"
export default function SecondSection({ imgUrl, progress }) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  const getImage = (ref) => {
    takeScreenshot(ref.current, {
      allowTaint: false,
      useCORS: true,
    });
  };

  return (
    <MainContainer>
      <ImgContainer>
        {imgUrl ? (
          <UploadedImg ref={ref} src={imgUrl} alt="Imagem carregada" />
        ) : (
          <ImgTextContainer>
            <img style={{width: "200px", margin: "10px"}} src={ImgIcon} alt="" />
            <h3 style={{color: "white", fontSize: "30px"}}>SELECIONE UMA IMAGEM COMO PLANO DE FUNDO</h3>
            {/* <progress value={progress} max="100"></progress> */}
          </ImgTextContainer>
        )}
      </ImgContainer>
      <div style={{}}>
        <SendWorkoutButton onClick={() => getImage(ref)}>
          ENVIAR TREINO
        </SendWorkoutButton>
        {/* <img width={"100%"} height={"100%"} src={image} alt={"Screenshot"} /> */}
      </div>
    </MainContainer>
  );
}
