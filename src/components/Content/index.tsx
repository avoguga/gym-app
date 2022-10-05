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
  const [images, setImages] = useState([]);

  const apiUrl = "http://localhost:8000/";
  const client = axios.create({
    baseURL: apiUrl,
  });

  const handleUpdate = () => {
    client.get("arquivos").then((response) => {
      setImages(response.data.resources);
    });
  }

  return (
    <ImageUploadContext.Provider
      value={{
        draggableImage,
        setDraggableImage,
        setLoading,
        images,
        handleUpdate
      }}
    >
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
