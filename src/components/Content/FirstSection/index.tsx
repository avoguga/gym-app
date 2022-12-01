import {
  useCallback,
  useEffect,
  useState,
} from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
import DraggableContainer from "../../DragglableContainer";
import {
  CreateElButton,
  DropZone,
  EquipsInput,
  InputIcon,
  MainContainer,
  ScrollableContainer,
  Text,
  UploadedImgs,
  UploadedImgsButton,
} from "./styles";
import gsap from "gsap";
import DragRotate from "gsap/Draggable";
import New from "../../DragglableContainer/new";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../../../firebase";
import Lupa from "../../../assets/magnifier-glass_icon-icons.com_71148.svg";
import PesoImg from "../../../assets/meu.png";

gsap.registerPlugin(DragRotate);

function FirstSection({
  imgUrl,
  setImgUrl,
  imgUrlArray,
  setImgUrlArray,
  setProgress,
  selectedFileByDrop,
  setSelectedFileByDrop,
  setDraggableImage,
  draggableImage,
  dragHalter,
}) {
  // Consts

  // Hooks

  const [counter, setCounter] = useState(0);

  const [selectedFileUrl, setSelectedFileUrl] = useState([]);

  const updateUploads = () => {
    const file = selectedFileByDrop[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log("O arquivo está upando:", progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedFileByDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (selectedFileByDrop != null && selectedFileByDrop?.length < 1) return;
    const newImgUrls: any = [];
    selectedFileByDrop?.forEach((img: Blob | MediaSource) =>
      newImgUrls.push(URL.createObjectURL(img))
    );
    setSelectedFileUrl(newImgUrls);
  }, [selectedFileByDrop]);

  const createDraggableComponent = () => {
    setCounter(counter + 1);
    setDraggableImage([...draggableImage, counter]);
  };

  useEffect(() => {
    if (!selectedFileByDrop) return;
    updateUploads();
  }, [selectedFileByDrop]);

  // useEffect(() => {
  //   const storageImgRef = ref(storage, `images/`);
  //   listAll(storageImgRef)
  //     .then((res) => {
  //       let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
  //       Promise.all(promises).then((urls) => {
  //         setImgUrlArray(urls);
  //       });
  //       // setImgUrlArray(res.items);
  //       res.prefixes.forEach((folderRef) => {
  //         // console.log(folderRef);
  //         // All the prefixes under listRef.
  //         // You may call listAll() recursively on them.
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // Uh-oh, an error occurred!
  //     });
  // }, []);

  

  return (
    <MainContainer>
      <ScrollableContainer>
        <form>
          <DropZone {...getRootProps()}>
            <input type="file" {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <Text>
                Arraste aqui suas imagens, ou clique aqui para seleciona-las
              </Text>
            )}
          </DropZone>

          <br />
        </form>

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Text style={{ fontSize: 18 }}>PLANOS DE FUNDO SALVOS</Text>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "10px"
          }}
        >
          {imgUrlArray.map((urls, index) => (
            <UploadedImgsButton onClick={() => setImgUrl(urls)}>
              <UploadedImgs src={urls} key={index} alt="" />
            </UploadedImgsButton>
          ))}
        </div>
        <Text style={{ fontSize: 12, marginTop: "7px" }}>Mostrar mais...</Text>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#c90087",
              width: "180px",
              height: "35px",
              marginTop: "20px",
            }}
          >
            <Text style={{ fontSize: 18, marginTop: "7px" }}>EQUIPAMENTOS</Text>
          </div>
          <br />
          <div style={{ position: "relative" }}>
            <InputIcon src={Lupa} />
            <EquipsInput placeholder="Buscar equipamento..." />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "100px",
          }}
        >
          <CreateElButton onClick={() => createDraggableComponent()}>
            <img src={PesoImg} alt="Corda" style={{ width: "150px" }} />
            CORDA
          </CreateElButton>

          <CreateElButton onClick={() => createDraggableComponent()}>
            <img src={PesoImg} alt="Haltere" style={{ width: "150px" }} />
            HALTERES
          </CreateElButton>

          <CreateElButton onClick={() => createDraggableComponent()}>
            <img src={PesoImg} alt="Wall Ball" style={{ width: "150px" }} />
            WALL BALL
          </CreateElButton>

          <CreateElButton onClick={() => createDraggableComponent()}>
            <img
              src={PesoImg}
              alt="Faixa Elástica"
              style={{ width: "150px" }}
            />
            FAIXA ELÁSTICA
          </CreateElButton>

          <CreateElButton onClick={() => createDraggableComponent()}>
            <img src={PesoImg} alt="Haltere" style={{ width: "150px" }} />
            HALTERES
          </CreateElButton>
          <CreateElButton onClick={() => createDraggableComponent()}>
            <img src={PesoImg} alt="Haltere" style={{ width: "150px" }} />
            HALTERES
          </CreateElButton>
          <CreateElButton onClick={() => createDraggableComponent()}>
            <img src={PesoImg} alt="Haltere" style={{ width: "150px" }} />
            HALTERES
          </CreateElButton>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
       
        </div>
      </ScrollableContainer>
    </MainContainer>
  );
}

export default FirstSection;
