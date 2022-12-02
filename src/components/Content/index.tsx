import { MainContainer } from "./styles";
import { useState, createRef, useRef } from "react";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import Draggable from "react-draggable";
import New from "../DragglableContainer/new";
import DraggableContainer from "../DragglableContainer";
export function Content() {
  // Hooks
  const [draggableImage, setDraggableImage] = useState(Array);
  const [progres, setProgress] = useState(0);
  const [selectedFileByDrop, setSelectedFileByDrop] = useState<[File]>();
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlArray, setImgUrlArray] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  
  const dragHalter: any = useRef([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);

  const removeHalter = (index) => {
    dragHalter.current[index].current.remove();
  };

  const draggable = (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {draggableImage.map((obj: any, index: any) => (
        <div ref={dragHalter.current[index]} key={index}>
          <Draggable handle={"#handle" + index}>
            <New isDisable={isDisable}>
              <DraggableContainer
                dragFunction={() => removeHalter(index)}
                componentClass={"handle" + index}
                isDisable={isDisable}
              />
            </New>
          </Draggable>
        </div>
      ))}
    </div>
  );

  return (
    <MainContainer>
      <SecondSection
        imgUrl={imgUrl}
        progress={progres}
        draggable={draggable}
        isDisable={isDisable}
        setIsDisable={setIsDisable}
      />
      <FirstSection
        draggableImage={draggableImage}
        setDraggableImage={setDraggableImage}
        selectedFileByDrop={selectedFileByDrop}
        setSelectedFileByDrop={setSelectedFileByDrop}
        imgUrl={imgUrl}
        setImgUrl={setImgUrl}
        setProgress={setProgress}
        setImgUrlArray={setImgUrlArray}
        imgUrlArray={imgUrlArray}
        dragHalter={dragHalter}
      />
    </MainContainer>
  );
}

export default Content;
