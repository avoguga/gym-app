import styled from "styled-components";

export const MainContainer = styled.main`
  grid-area: CT;
  background-color: whitesmoke;
  display: flex;
  justify-content: space-around;
`;

export const DraggableButton = styled.button`
  visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
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
    background-color: #ff0000;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  ::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
export const MobileContainer = styled.main`
  grid-area: CT;
  width: 95%;
  height: 60%;
  margin-top: 60px;
  margin-left: 10px;
  position: relative;
  top: 0;
  left: 0;

  // Set the background color to #c90087
  background-color: #c90087;

  // Center the content horizontally and vertically
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // Add padding to the container
  padding: 20px;

  // Add a border-radius to make it look like a modal
  border-radius: 8px;

  // Add a box-shadow for a modal-like appearance
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);

  // Add a max-width to make it look better on mobile
  max-width: 500px;

  // Add a min-height to make it look better on mobile
  min-height: 300px;

  // make border round and add a border
  border-radius: 20px;
  border: 3px solid #000;
`;
