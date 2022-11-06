import React, { useCallback, useEffect, useRef, useState, createRef } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import DraggableContainer from "../../DragglableContainer";
import {
  CreateElButton,
  DropZone,
  MainContainer,
  Text,
  UploadedImgs,
} from "./styles";
import gsap from "gsap";
import DragRotate from "gsap/Draggable";
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

  // Hooks

  const dragHalter: any = useRef([createRef()]);
  
  const [counter, setCounter] = useState(0);

  const [selectedFileUrl, setSelectedFileUrl] = useState([]);

  const updateUploads = () => {
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
    setCounter(counter + 1);
    setDraggableImage([...draggableImage, counter]);
  };

  const removeHalter = (index) => {
    dragHalter.current[index].current.remove();
  };

  useEffect(() => {
    if (!selectedFileByDrop) return;
    updateUploads();
  }, [selectedFileByDrop]);

  return (
    <MainContainer>
      <form>
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

        <br />
      </form>

      <br />
      <div style={{ display: "flex" }}>
        <Text>Imagens Disponiveis</Text>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <UploadedImgs src={imgUrl} alt="" />
      </div>
      <br />
      <CreateElButton onClick={() => createDraggableComponent()}>
        Haltere
      </CreateElButton>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {draggableImage.map((obj: any, index: any) => (
          <div ref={dragHalter.current[index]} key={index}>
            <Draggable handle={"#handle" + index}>
              <New>
                <DraggableContainer
                  dragFunction={() => removeHalter(index)}
                  componentClass={"handle" + index}
                />
              </New>
            </Draggable>
          </div>
        ))}
      </div>
    </MainContainer>
  );
}

export default FirstSection;
