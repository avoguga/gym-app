import React, { createRef, useEffect, useRef, useState } from "react";
import New from "../../DragglableContainer/new";
import {
  ImgContainer,
  ImgTextContainer,
  MainContainer,
  SendWorkoutButton,
  UploadedImg,
} from "./styles";
import ImgIcon from "../../../assets/img-icon.jpeg";
import html2canvas from "html2canvas";
export default function SecondSection({
  imgUrl,
  progress,
  draggable,
  isDisable,
  setIsDisable,
}) {
  const ref = useRef<HTMLImageElement | null>(null);

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

    downloadImage(image, "filename");

    // @ts-ignore
    html.style.width = null;
    // @ts-ignore
    body.style.width = null;

    setIsDisable(false)
  };

  useEffect(() => {
    if(isDisable) {
      exportAsImageAndRemoveStylesFromDraggableElements(ref.current)
    }
  }, [isDisable])
  

  return (
    <MainContainer>
      <ImgContainer ref={ref}>
        {draggable}
        {!ImgIcon || imgUrl ? (
          <UploadedImg
            crossOrigin="anonymous"
            src={imgUrl}
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
            {/* <progress value={progress} max="100"></progress> */}
          </ImgTextContainer>
        )}
      </ImgContainer>
      <div style={{}}>
        <SendWorkoutButton
          onClick={() =>
            setIsDisable(true)
          }
        >
          ENVIAR TREINO
        </SendWorkoutButton>
        {/* <img width={"100%"} height={"100%"} src={image} alt={"Screenshot"} /> */}
      </div>
    </MainContainer>
  );
}
