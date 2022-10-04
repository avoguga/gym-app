import React from "react";
import { DraggableButton, DraggableImg, Container } from "./styles";
import PesoImg from "../../assets/meu.png";

export default function DraggableContainer({componentClass}: any) {
  console.log(componentClass)
  return (
    <Container>
      <DraggableButton className={componentClass} />
      <DraggableImg src={PesoImg} />
      <p>{}</p>
    </Container>
  );
}
