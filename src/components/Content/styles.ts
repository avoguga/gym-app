import styled from "styled-components";

export const MainContainer = styled.main`
  grid-area: CT;
  background-color: whitesmoke;
  display: flex;
  justify-content: space-around;
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
  right: 5px;
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
