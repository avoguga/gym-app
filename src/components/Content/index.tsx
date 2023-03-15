import { MainContainer } from "./styles";
import { useState, createRef, useRef } from "react";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import Draggable from "react-draggable";
import RePosition from "../DragglableContainer/re-position";
import { DraggableButton } from "./styles";

export function Content() {
  // Hooks
  const [draggableImage, setDraggableImage] = useState(Array);
  const [progres, setProgress] = useState(0);
  const [selectedFileByDrop, setSelectedFileByDrop] = useState<[File]>();
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlArray, setImgUrlArray] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [aaaa, setAaaa] = useState();
  const [isVisible, setIsVisible] = useState(true);

  const [imgGeneretedFromDraggableImg, setImgGeneretedFromDraggableImg] =
    useState([]);

  // const refs = [...Array(100)].map(() => createRef());

  const refs = {};
  const dragHalter: any = useRef(refs);

  [...Array(100)].forEach((_, index) => {
    refs[index] = createRef();
  });

  const removeHalter = (index) => {
    const halterRef: any = refs[index];
    if (halterRef && halterRef.current) {
      halterRef.current.remove();
    }
  };

  const draggable = (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {draggableImage.map((obj, index) => (
        <div ref={refs[index]} key={index}>
          <Draggable handle={`#handle${index}`}>
            <RePosition
              img={imgGeneretedFromDraggableImg[index]}
              isDisable={isDisable}
            >
              <DraggableButton
                onClick={() => removeHalter(index)}
                disabled={isDisable}
              />
            </RePosition>
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
        isVisible={isVisible}
        setIsVisible={setIsVisible}
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
        imgGeneretedFromDraggableImg={imgGeneretedFromDraggableImg}
        setImgGeneretedFromDraggableImg={setImgGeneretedFromDraggableImg}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </MainContainer>
  );
}

export default Content;
