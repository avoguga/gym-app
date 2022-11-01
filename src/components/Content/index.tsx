import { MainContainer } from "./styles";
import axios from "axios";
import { useState } from "react";
import { ImageUploadContext } from "../../contexts/AppContext";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
export function Content() {
  // Hooks
  const [draggableImage, setDraggableImage] = useState(Array);
  const [progres, setProgress] = useState(0);
  const [selectedFileByDrop, setSelectedFileByDrop] = useState<any>();
  const [imgUrl, setImgUrl] = useState("");

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
      />
    </MainContainer>
  );
}

export default Content;
