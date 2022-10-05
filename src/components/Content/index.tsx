import {
  MainContainer,
  SecondSection,
  ThirdSection,
  ImgContainer,
  UploadedImg,
  Text,
  DropZone,
  CreateElButton,
  PreviewImg,
} from "./styles";
import Draggable from "react-draggable";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import DraggableContainer from "../DragglableContainer";
import { useDropzone } from "react-dropzone";
import { ImageUploadContext } from "../../contexts/AppContext";
import FirstSection from "./FirstSection";
export function Content() {

  // Hooks
  const [image, setImage] = useState();
  const [draggableImage, setDraggableImage] = useState(Array);
  const [loading, setLoading] = useState(false);

  return (
    <ImageUploadContext.Provider value={{
      draggableImage,
      setDraggableImage,
      setLoading,
    }}>
      <MainContainer>
        <FirstSection />
        <SecondSection>
          <div style={{ display: "flex" }}>
            <ImgContainer>
              {loading == true ? (
                <h3>Carregando...</h3>
              ) : (
                <UploadedImg src={image} alt="Imagem carregada" />
              )}
            </ImgContainer>
          </div>
        </SecondSection>
      </MainContainer>
    </ImageUploadContext.Provider>
  );
}

export default Content;
