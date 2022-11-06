import { DraggableButton, DraggableImg, Container } from "./styles";
import PesoImg from "../../assets/meu.png";

interface DraggableContainer {
  componentClass: string;
  dragRef?: any;
  dragFunction(): any;
}

 const DraggableContainer = ({componentClass, dragFunction }: DraggableContainer) => {
  return (
    <Container>
      <DraggableButton onClick={() => dragFunction()} />
      <DraggableImg src={PesoImg} />
      <p>{}</p>
    </Container>
  );
}

export default DraggableContainer;