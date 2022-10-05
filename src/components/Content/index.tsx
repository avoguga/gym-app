import { MainContainer } from "./styles";
import axios from "axios";
import { useState } from "react";
import { ImageUploadContext } from "../../contexts/AppContext";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";

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
  };

  return (
    <ImageUploadContext.Provider
      value={{
        draggableImage,
        setDraggableImage,
        setLoading,
        images,
        handleUpdate,
        image,
      }}
    >
      <MainContainer>
        <FirstSection />
        <SecondSection />
      </MainContainer>
    </ImageUploadContext.Provider>
  );
}

export default Content;
