import {
  MainContainer,
  FirstSection,
  SecondSection,
  ThirdSection,
  ImgContainer,
  UploadedImg,
} from "./styles";
import Draggable from "react-draggable";
import axios from "axios";
import { useState } from "react";
import PesoImg from "../../assets/peso.png";
import PesoImg2 from "../../assets/pesoo.png";
import DraggableContainer from "../DragglableContainer";

export function Content() {
  // Hooks FirstSection
  const [selectedFile, setSelectedFile]: any = useState();
  const [image, setImage] = useState();
  const [draggableImage, setDraggableImage]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragIsClicked, setDragIsClicked] = useState(false);

  // Consts
  const apiUrl = "http://localhost:8000/upload/arquivo";

  // Functions

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);

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

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <MainContainer>
      <FirstSection>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileSelect} />
          <input type="submit" value="Upload File" />
        </form>
        <div style={{ display: "flex" }}>
          <ImgContainer>
            {loading == true ? (
              <h3>Carregando...</h3>
            ) : (
              <UploadedImg src={image} alt="Imagem carregada" />
            )}
          </ImgContainer>
        </div>
      </FirstSection>

      <SecondSection>
        <button
          style={{ height: "20px", width: "100px", marginTop: "10px" }}
          onClick={() =>
            setDraggableImage([
              ...draggableImage,
              <DraggableContainer componentClass="handle" />,
            ])
          }
        >
          Criar elemento
        </button>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Draggable handle=".handle">
            <div>
              {draggableImage.map((a: any, i: any) => (
                <div key={i}>{a}</div>
              ))}
            </div>
          </Draggable>
        </div>
      </SecondSection>
    </MainContainer>
  );
}

export default Content;
