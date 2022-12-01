import { DraggableButton, DraggableImg, Container } from "./styles";
import PesoImg from "../../assets/meu.png";

interface DraggableContainer {
  componentClass: string;
  dragRef?: any;
  dragFunction(): any;
  isDisable?: boolean;
}

 const DraggableContainer = ({componentClass, dragFunction, isDisable }: DraggableContainer) => {
  return (
    <Container>
      <DraggableButton disabled={isDisable} onClick={() => dragFunction()} />
      <DraggableImg src={PesoImg} />
      <p>{}</p>
    </Container>
  );
}

export default DraggableContainer;