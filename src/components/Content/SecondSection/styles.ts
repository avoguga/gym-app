import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

export const StyledLoader = styled(LoadingOverlay)`
  @media (min-width: 960px) {
    width: 960px;
    height: 500px;
  }
  @media (min-width: 1500px) {
    width: 1500px;
    height: 800px;
  }
  width: 1200px;
  height: 600px;
  .MyLoader_overlay {
    /* background: rgba(255, 0, 0, 0.5); */
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 960px) {
    width: 960px;
    height: 500px;
  }
  @media (min-width: 1500px) {
    width: 1500px;
    height: 800px;
  }
  width: 1200px;
  height: 600px;
  background-color: #c90087;
`;

export const SendWorkoutButton = styled.button`
  margin: 10px;
  background-color: #c90087;
  color: white;
  font-size: 18px;
  border-radius: 40px;
  width: 200px;
  height: 50px;
  border: none;
  @media (min-width: 1500px) {
    margin-left: 660px;
  }
  margin-left: 370px;
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
