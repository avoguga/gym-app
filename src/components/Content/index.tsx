import { useState, createRef, useRef, useEffect } from "react";
import SecondSection from "./SecondSection";
import FirstSection from "./FirstSection";
import Draggable from "react-draggable";
import RePosition from "../DragglableContainer/re-position";
import { DraggableButton, MobileContainer, MainContainer } from "./styles";

export function Content() {
  // Hooks
  const [draggableImage, setDraggableImage] = useState(Array);
  const [progres, setProgress] = useState(0);
  const [selectedFileByDrop, setSelectedFileByDrop] = useState<[File]>();
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlArray, setImgUrlArray] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)
    ? setIsMobile(true)
    : setIsMobile(false);
  }, [isMobile]);
  


  const [imgGeneretedFromDraggableImg, setImgGeneretedFromDraggableImg] =
    useState([]);

  // const refs = [...Array(100)].map(() => createRef());

  const refs = {};
  const dragHalter: any = useRef(refs);

  [...Array(100)].forEach((_, index) => {
    refs[index] = createRef();
  });

  const removeEquipment = (index) => {
    const equipmentRef: any = refs[index];
    if (equipmentRef && equipmentRef.current) {
      equipmentRef.current.remove();
    }
  };

  const removeAllEquipments = () => {
    for (const key in refs) {
      const equipmentRef = refs[key];
      if (equipmentRef && equipmentRef.current) {
        equipmentRef.current.remove();
      }
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
                onClick={() => removeEquipment(index)}
                disabled={isDisable}
              />
            </RePosition>
          </Draggable>
        </div>
      ))}
    </div>
  );

  return !isMobile ? (
    <MainContainer>
      <FirstSection
        imgUrl={imgUrl}
        progress={progres}
        draggable={draggable}
        isDisable={isDisable}
        setIsDisable={setIsDisable}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        removeAllEquipments={removeAllEquipments}
      />
      <SecondSection
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
  ) : (
    <MobileContainer>
      <img
        src="https://portalaluno.cesmac.edu.br/FrameHTML/web/app/Edu/PortalEducacional/login/assets/img/logo-responsivo.png"
        alt="CESMAC"
        style={{ width: "130px", marginRight: "30px" }}
      />
      <h1
        style={{
          color: "white",
          fontSize: "2rem",
        }}
      >
        Este conteúdo só está disponível no desktop{" "}
      </h1>
    </MobileContainer>
  );
}

export default Content;
