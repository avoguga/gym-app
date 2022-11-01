import { ImgContainer, MainContainer, UploadedImg } from "./styles";

export default function SecondSection({ imgUrl, progress }) {
  return (
    <MainContainer>
      <ImgContainer>
        {imgUrl ? (
          <UploadedImg src={imgUrl} alt="Imagem carregada" />
        ) : (
          <div>
            <h3>Carregue uma Img!</h3>
            <progress value={progress} max="100"></progress>
          </div>
        )}
      </ImgContainer>
    </MainContainer>
  );
}
