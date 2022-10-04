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
  width: 100%;
  padding: 10px;
`;

export const SecondSection = styled.div`
  height: 100%;
  width: 100%;
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

export const DraggableImg = styled.img`
  width: 100px;
  height: 50px;
  margin-top: 5px;
`;

export const DraggableContainer = styled.div`

`;


export const DraggableButton = styled.div`
  height: 5px;
  width: 10px;
  border-radius: 200px;
  background-color: red;
  padding-top: 10px;
`;
