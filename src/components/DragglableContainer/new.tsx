import React, { PropsWithChildren, useState } from "react";
import { PositionableContainer, Position } from "re-position";

interface AppState {
  position: Position;
}



const New = ({ children, isDisable}: any ) => {
  const [appState, setAppState] = useState({
    position: {
      left: "100px",
      top: "100px",
      width: "100px",
      height: "100px",
      rotation: "0deg",
    },
  });

  const handleUpdate = (position: Position) => setAppState({ position });

  const { position } = appState;

  return (
    <PositionableContainer
    className="container"
    movable
    resizable
    rotatable
    disabled={isDisable}
    position={position}
    onUpdate={handleUpdate}
  >
    {children}
  </PositionableContainer>
  );
};

export default New;
