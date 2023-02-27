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
  width: 25px;
  height: 25px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  bottom: 30px;
  :hover {
    background-color: #ff9a9a;
    border-radius: 50%;
  }
  ::before,
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 2px;
    background-color: #FF0000;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  ::after {
    transform: translate(-50%, -50%) rotate(-45deg);
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