import React from "react";
import { DraggableButton, DraggableImg, Container } from "./styles";
import PesoImg from "../../assets/meu.png";

interface DraggableContainer {
  componentClass: string;
}

export default function DraggableContainer({componentClass}: DraggableContainer) {
  return (
    <Container>
      <DraggableButton id={componentClass} />
      <DraggableImg src={PesoImg} />
      <p>{}</p>
    </Container>
  );
}
