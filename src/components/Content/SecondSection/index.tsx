import React, { createRef, useRef, useState } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import { ImgContainer, MainContainer, UploadedImg } from "./styles";

export default function SecondSection({ imgUrl, progress }) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [image, takeScreenshot] = useScreenshot({ type: 'image/jpeg', quality: 1.0 })
  const getImage = (ref) => {
    takeScreenshot(ref.current, {
      allowTaint: false,
      useCORS: true,
    });
  }

  return (
    <MainContainer>
      <ImgContainer>
        {imgUrl ? (
            <UploadedImg ref={ref} src={imgUrl}   alt="Imagem carregada" />
        ) : (
          <div>
            <h3>Carregue uma Img!</h3>
            <progress value={progress} max="100"></progress>
          </div>
        )}
      </ImgContainer>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={() => getImage(ref)}>
          Take screenshot
        </button>
      </div>
      <img width={"100%"} height={"100%"} src={image} alt={'Screenshot'} />
    </MainContainer>
  );
}
