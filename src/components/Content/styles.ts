import styled from "styled-components";

export const MainContainer = styled.main`
  grid-area: CT;
  background-color: whitesmoke;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const FirstSection = styled.div`
  height: 100%;
  width: 30%;
  background-color: #222;
  padding: 10px;
`;

export const SecondSection = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
`;

export const ThirdSection = styled.div`
  height: 100%;
  width: 100%;
`;

export const ImgContainer = styled.div`
  width: auto;
  height: auto;
`;

export const UploadedImg = styled.img`
  width: 1000px;
  height: 100%;
`;

export const Text = styled.p`
  font-size: 16px;
  color: #FFF;
`;

export const DropZone = styled.div`
  border: 1px dashed #fff;
  margin-top: 10px;
  padding: 10px;
  height: 100px;
  width: 350px;
  border-radius: 5px;
  font-weight:400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CreateElButton = styled.button`
  font-size: 16px;
  width: 100px;
  margin-top: 10px;
`;

export const UploadButton = styled.button`
  font-size: 16px;
  width: 140px;
  margin-top: 10px;
`;

export const PreviewImg = styled.img`
  margin: 10px;
  width: 150px;
`;