import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  width: 370px;
  background-color: #222;
  padding: 10px;

  position: fixed;
  top: 50px;
  bottom: 0px;
  left: 0px;
`;

export const DragMe = styled.div`
  height: 100px;
  width: 100px;
  background: blue;
  border-radius: 10px;
  margin: 50px;
  color: white;
  font-size: 20px;
  padding: 10px;
`;

export const UploadedImg = styled.img`
  width: 1000px;
  height: 100%;
`;

export const Text = styled.p`
  font-size: 16px;
  color: #fff;
`;

export const DropZone = styled.div`
  border: 1px dashed #fff;
  margin-top: 10px;
  padding: 10px;
  height: 100px;
  width: 350px;
  border-radius: 5px;
  font-weight: 400;
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

export const UploadedImgs = styled.img`
  margin: 10px;
  width: 150px;
`;
