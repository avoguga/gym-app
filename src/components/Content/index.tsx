import {
  MainContainer,
  FirstSection,
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

export function Content() {
  // Hooks FirstSection
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState([]);
  const [selectedFileByDrop, setSelectedFileByDrop] = useState<[File]>();
  const [image, setImage] = useState();
  const [draggableImage, setDraggableImage] = useState(Array);
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFileByDrop(acceptedFiles);
  }, []);

  useEffect(() => {
    if(selectedFileByDrop?.length < 1) return;
    const newImgUrls: any = [];
    selectedFileByDrop?.forEach((img: Blob | MediaSource) => newImgUrls.push(URL.createObjectURL(img)));
    setSelectedFileUrl(newImgUrls)
  }, [selectedFileByDrop])
  

  // Consts
  const apiUrl = "http://localhost:8000/upload/arquivo";

  const fileName = selectedFileByDrop?.map((file) => {
    return file;
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Functions

  const handleSubmit = async () => {
    const formData = new FormData();
    if(selectedFileByDrop)
    formData.append("file", selectedFileByDrop[0]);

    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: apiUrl,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((res) => {
        setLoading(false);
        setImage(res.data.url);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const createDraggableComponent = () => {
    setDraggableImage([...draggableImage, counter]);
    setCounter(counter + 1);
  };

  console.log(selectedFileByDrop?.length)
  return (
    <MainContainer>
      <FirstSection>
      <form onSubmit={handleSubmit}>
          {/* <input  onChange={handleFileSelect} /> */}
          <input type="submit" value="Upload File" />
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
          </form>
        {/* {fileName ? <Text>{fileName}</Text> : null} */}
        {selectedFileUrl.map(imgSrc => <PreviewImg src={imgSrc}/>)}
        <br />
        <CreateElButton onClick={() => createDraggableComponent()}>
          Haltere
        </CreateElButton>
        <div style={{ display: "flex" }}>
          {draggableImage.map((a: any, i: any) => (
            <Draggable handle={"#handle" + i}>
              <div>
                <DraggableContainer componentClass={"handle" + i} />
              </div>
            </Draggable>
          ))}
        </div>
      </FirstSection>

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
  );
}

export default Content;
