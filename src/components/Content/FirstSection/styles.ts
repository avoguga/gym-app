import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay-ts";
import TrashCanClosed from "../../../assets/trash-can.png";
import TrashCanOpen from "../../../assets/trash-can-open.png";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

export const StyledLoader = styled(LoadingOverlay)<{ isVisible: boolean }>`
  @media (min-width: 960px) {
    width: ${(props) => props.isVisible ? "960px" : "100%"};
    height: 500px;
  }
  @media (min-width: 1500px) {
    width: ${(props) => props.isVisible ? "1200px" : "100%"};
    height: 600px;
  }
  @media (min-width: 1900px) {
    width: ${(props) => props.isVisible ? "1500px" : "100%"};
    height: 800px;
  }
  width: ${(props) => props.isVisible ? "1200px" : "100%"};
  height: 600px;
  .MyLoader_overlay {
    /* background: rgba(255, 0, 0, 0.5); */
  }
`;

export const ImgContainer = styled.div<{ isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c90087;

  @media (min-width: 960px) {
    width: ${(props) => props.isVisible ? "960px" : "100%"};
    height: 500px;
  }

  @media (min-width: 1500px) {
    width: ${(props) => props.isVisible ? "1100px" : "100%"};
    height: 600px;
  }

  @media (min-width: 1900px) {
    width: ${(props) => props.isVisible ? "1500px" : "100%"};
    height: 800px;
  }

  width: 100%;
  height: 100%;
`;

// Make a trash icon

export const TrashCanIcon = styled.div`
  background-image: url(${TrashCanClosed});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 30px;
  height: 30px;
  position: absolute;
  cursor: pointer;
  &:hover {
    background-image: url(${TrashCanOpen});
  }
`;




export const SendWorkoutButton = styled.button<{ isVisible: boolean }>`
  margin: 10px;
  background-color: #c90087;
  color: white;
  font-size: 18px;
  border-radius: 40px;
  width: 200px;
  height: 50px;
  border: none;
  @media (min-width: 1500px) {
    margin-left: ${(props) => props.isVisible ? "450px" : "650px"};
  }
  @media (min-width: 1900px) {
    margin-left: ${(props) => props.isVisible ? "650px" : "850px"};
  }
  margin-left: ${(props) => props.isVisible ? "370px" : "500px"};
`;

export const ImgTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: auto;
  padding: 10px;
  border: 1px dotted white;
`;

export const UploadedImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const Text = styled.p`
  font-size: 16px;
  color: #fff;
`;
