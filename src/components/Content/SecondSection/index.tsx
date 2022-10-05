import React, { useContext } from "react";
import { ImageUploadContext } from "../../../contexts/AppContext";
import { ImgContainer, MainContainer, UploadedImg } from "./styles";

export default function SecondSection() {
  const { loading, image }: any = useContext(ImageUploadContext);
  return (
    <MainContainer>
      <ImgContainer>
        {loading == true ? (
          <h3>Carregando...</h3>
        ) : (
          <UploadedImg src={image} alt="Imagem carregada" />
        )}
      </ImgContainer>
    </MainContainer>
  );
}
