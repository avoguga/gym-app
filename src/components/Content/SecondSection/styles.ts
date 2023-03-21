import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 380px;
  background-color: #222;
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
`;

export const ScrollableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;

  overflow-y: auto;
  overflow-x: hidden;
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
  text-align: center;
`;

export const DropZone = styled.div`
  border: 1px dashed #fff;
  margin-top: 10px;
  height: 100px;
  border-radius: 5px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CreateElButton = styled.button`
  font-size: 16px;
  width: 150px;
  height: 120px;
  margin: 10px;
  background-color: #d9d9d9;
  border-radius: 20px;
  border: none;
`;

export const InputIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  padding: 4px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  filter: contrast(0%);
`;

export const EquipsInput = styled.input`
  height: 35px;
  width: 325px;
  padding-left: 1.5rem;
  border-radius: 30px;
  background-color: #d9d9d9;
  border: none;
  text-indent: 10px;
  margin: 10px;
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

export const UploadedImgsButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
`;

export const UploadedImgs = styled.img`
  margin: 5px;
  width: 100px;
  height: 60px;
`;

export const HideButton = styled.button`
  border: none;
  background-color: #222;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 350px;
  right: 370px;
  width: 30px;
  height: 100px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  img{
    width: 20px;
  }
`;

export const ShowButton = styled.button`
  border: none;
  background-color: #222;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 350px;
  right: 0px;
  height: 100px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  img{
    width: 30px;
  }
`;

export const ShowSavedBackgroudButton = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: #c90087;
  color: white;
  font-size: 18px;
  border-radius: 40px;
  width: 300px;
  height: 70px;
  border: none;
  &:hover{
    background-color: #a60370;
  }
`;
