import React, { useCallback, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import DraggableContainer from "../../DragglableContainer";
import {
  CreateElButton,
  DropZone,
  PreviewImg,
  MainContainer,
  Text,
  UploadedImgs,
} from "./styles";
import { useContext } from "react";
import { ImageUploadContext } from "../../../contexts/AppContext";
import axios from "axios";

function FirstSection() {
  const { draggableImage, image, setDraggableImage, setLoading }: any =
    useContext(ImageUploadContext);

  // Consts

  const apiUrl = "http://localhost:8000/";
  const client = axios.create({
    baseURL: apiUrl,
  });

  const [counter, setCounter] = useState(0);
  const [selectedFileByDrop, setSelectedFileByDrop] = useState<[File]>();
  const [selectedFileUrl, setSelectedFileUrl] = useState([]);
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFileByDrop(acceptedFiles);
  }, []);

  const fileName = selectedFileByDrop?.map((file) => {
    return file;
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (selectedFileByDrop?.length < 1) return;
    const newImgUrls: any = [];
    selectedFileByDrop?.forEach((img: Blob | MediaSource) =>
      newImgUrls.push(URL.createObjectURL(img))
    );
    setSelectedFileUrl(newImgUrls);
  }, [selectedFileByDrop]);

  useEffect(() => {
    client.get("arquivos").then((response) => {
      setImages(response.data.resources);
    });
  }, []);

  const createDraggableComponent = () => {
    setDraggableImage([...draggableImage, counter]);
    setCounter(counter + 1);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (selectedFileByDrop) formData.append("file", selectedFileByDrop[0]);

    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: apiUrl + "upload/arquivo",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(images);
  return (
    <MainContainer>
      <form onSubmit={handleSubmit}>
        {selectedFileUrl.length > 0 ? (
          selectedFileUrl.map((imgSrc: string | undefined, i: any) => (
            <PreviewImg src={imgSrc} key={i} />
          ))
        ) : (
          <DropZone {...getRootProps()}>
            <input type="file" {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <Text>
                Arraste aqui suas imagens, ou clique aqui para seleciona-las
              </Text>
            )}
          </DropZone>
        )}
        <br />
        <input type="submit" value="Upload File" />
      </form>

      <br />
      <Text>Imagens Disponiveis</Text>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image: any, key: number) => (
          <UploadedImgs src={image.url} alt="" key={key} />
        ))}
      </div>

      <br />
      <CreateElButton onClick={() => createDraggableComponent()}>
        Haltere
      </CreateElButton>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {draggableImage.map((a: any, i: any) => (
          <Draggable handle={"#handle" + i}>
            <div>
              <DraggableContainer componentClass={"handle" + i} />
            </div>
          </Draggable>
        ))}
      </div>
    </MainContainer>
  );
}

export default FirstSection;
