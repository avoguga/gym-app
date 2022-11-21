import { MainContainer } from "./styles";
import { useState } from "react";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
export function Content() {
  // Hooks
  const [draggableImage, setDraggableImage] = useState(Array);
  const [progres, setProgress] = useState(0);
  const [selectedFileByDrop, setSelectedFileByDrop] = useState<[File]>();
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlArray, setImgUrlArray] = useState([]);

  return (
    <MainContainer>
      <SecondSection imgUrl={imgUrl} progress={progres} />
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
      />
    </MainContainer>
  );
}

export default Content;
