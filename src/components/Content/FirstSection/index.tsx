import React, { useCallback, useEffect, useRef, useState } from "react";
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
  DragMe,
} from "./styles";
import { useContext } from "react";
import { ImageUploadContext } from "../../../contexts/AppContext";
import axios from "axios";
import gsap from "gsap";
import DragRotate from "gsap/Draggable";
import { UploadedImg } from "../SecondSection/styles";
import New from "../../DragglableContainer/new";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";

gsap.registerPlugin(DragRotate);

function FirstSection({
  imgUrl,
  setImgUrl,
  setProgress,
  selectedFileByDrop,
  setSelectedFileByDrop,
  setDraggableImage,
  draggableImage,
}) {
  // Consts

  const apiUrl = "http://localhost:8000/";

  // Hooks

  const dragInstance: any = useRef(null);
  const dragTarget = useRef(null);

  useEffect(() => {
    dragInstance.current = DragRotate.create(dragTarget.current, {
      type: "rotation",
      onDragEnd() {
        console.log(this);
      },
    });
  }, []);

  const [counter, setCounter] = useState(0);

  const [selectedFileUrl, setSelectedFileUrl] = useState([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFileByDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (selectedFileByDrop != null && selectedFileByDrop?.length < 1) return;
    const newImgUrls: any = [];
    selectedFileByDrop?.forEach((img: Blob | MediaSource) =>
      newImgUrls.push(URL.createObjectURL(img))
    );
    setSelectedFileUrl(newImgUrls);
  }, [selectedFileByDrop]);

  const createDraggableComponent = () => {
    setDraggableImage([...draggableImage, counter]);
    setCounter(counter + 1);
  };

  const handleSubmit = async () => {
    event?.preventDefault();
    const file = selectedFileByDrop[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log("O arquivo está upando:", progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  };

  const handleUpdate = () => {
    
  };

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
      <div style={{ display: "flex" }}>
        <Text>Imagens Disponiveis</Text>
        <button style={{ marginLeft: "10px" }} onClick={handleUpdate}>
          Atualizar
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <UploadedImgs src={imgUrl} alt="" />
      </div>

      <br />
      <CreateElButton onClick={() => createDraggableComponent()}>
        Haltere
      </CreateElButton>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {draggableImage.map((obj: any, key: any) => (
          <Draggable handle={"#handle" + key}>
            <New>
              <DraggableContainer componentClass={"handle" + key} />
            </New>
          </Draggable>
        ))}
      </div>
    </MainContainer>
  );
}

export default FirstSection;
