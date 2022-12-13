import React, { createRef, useEffect, useRef, useState } from "react";
import New from "../../DragglableContainer/new";
import {
  ImgContainer,
  ImgTextContainer,
  MainContainer,
  SendWorkoutButton,
  UploadedImg,
  StyledLoader,
} from "./styles";
import ImgIcon from "../../../assets/img-icon.jpeg";
import html2canvas from "html2canvas";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

export default function SecondSection({
  imgUrl,
  progress,
  draggable,
  isDisable,
  setIsDisable,
}) {
  const [loading, setLoading] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    // @ts-ignore
    fakeLink.style = "display:none;";

    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  const exportAsImageAndRemoveStylesFromDraggableElements = async (element) => {
    const html = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0];
    let htmlWidth = html.clientWidth;
    let bodyWidth = body.clientWidth;

    const newWidth = element.scrollWidth - element.clientWidth;

    if (newWidth > element.clientWidth) {
      htmlWidth += newWidth;
      bodyWidth += newWidth;
    }

    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";

    const canvas = await html2canvas(element, {
      backgroundColor: "none",
      logging: true,
      allowTaint: false,
      useCORS: true, //to enable cross origin perms
    });

    const image = canvas.toDataURL("image/png", 1.0);

    // Caso queira baixar a img, descomente a linha abaixo

    // downloadImage(image, "filename");

    // Enviando pro Firebase

    canvas.toBlob(function(blob: any){
      const storageRef = ref(storage, `workouts/${"nome"}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("O arquivo está upando:", progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );
    },"image/png")
   
  };

  useEffect(() => {
    if (isDisable) {
      exportAsImageAndRemoveStylesFromDraggableElements(imgRef.current);
    }
  }, [isDisable]);

  useEffect(() => {
    if (!ImgIcon || imgUrl) {
      setLoading(true);
    }
  }, [imgUrl]);

  return (
    <MainContainer>
      <StyledLoader
        styles={{
          spinner: (base) => ({
            ...base,
            width: "100px",
            "& svg circle": {
              stroke: "rgba(0, 255, 213, 0.5)",
            },
          }),
        }}
        classNamePrefix="MyLoader_"
        active={loading}
        spinner
        text="Carregando sua imagem..."
      >
        <ImgContainer ref={imgRef}>
          {draggable}
          {!ImgIcon || imgUrl ? (
            <UploadedImg
              crossOrigin="anonymous"
              src={imgUrl}
              onLoad={() => setLoading(false)}
              alt="Imagem carregada"
            />
          ) : (
            <ImgTextContainer>
              <img
                style={{ width: "200px", margin: "10px" }}
                src={ImgIcon}
                alt=""
              />
              <h3 style={{ color: "white", fontSize: "30px" }}>
                SELECIONE UMA IMAGEM COMO PLANO DE FUNDO
              </h3>
            </ImgTextContainer>
          )}
        </ImgContainer>
      </StyledLoader>

      <div style={{}}>
        <SendWorkoutButton onClick={() => setIsDisable(true)}>
          ENVIAR TREINO
        </SendWorkoutButton>
        {/* <img width={"100%"} height={"100%"} src={image} alt={"Screenshot"} /> */}
      </div>
    </MainContainer>
  );
}
