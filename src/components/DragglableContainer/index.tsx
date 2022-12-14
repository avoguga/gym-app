import { DraggableButton, DraggableImg, Container } from "./styles";
import PesoImg from "../../assets/meu.png";

interface DraggableContainer {
  componentClass: string;
  dragRef?: any;
  dragFunction(): any;
  isDisable?: boolean;
  img: any;
  index: any;
}

 const DraggableContainer = ({componentClass, dragFunction, isDisable, img, index }: DraggableContainer) => {
  return (
    <Container>
      <DraggableButton disabled={isDisable} onClick={() => dragFunction()} />
      <DraggableImg src={img} />
      <p>{}</p>
    </Container>
  );
}

export default DraggableContainer;