import styled from "styled-components";


export const DraggableImg = styled.img`
  width: 100%;
  height: 100%;
  margin-top: 5px;
`;

export const Container = styled.div`
  z-index: 100;
`;

export const DraggableButton = styled.button`
  visibility:  ${props => props.disabled ? "hidden" : "visible"};
  width: 15px;
  border-radius: 200px;
  background-color: #FF0000;
  padding-top: 10px;
  cursor: pointer;
  position: relative;
  bottom: 20px;
  left: 42px;
  :hover {
    background-color: #ff9a9a;
  }
`;


export const Girar = styled.div`
  height: 5px;
  width: 10px;
  border-radius: 200px;
  background-color: red;
  padding-top: 10px;
  cursor: move;
`;