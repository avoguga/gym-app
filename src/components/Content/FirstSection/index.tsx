import { createRef, useCallback, useEffect, useRef, useState } from "react";
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
import buttonElements from "./buttonElements";

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
  imgGeneretedFromDraggableImg,
  setImgGeneretedFromDraggableImg
}) {
  // Consts

  // Hooks

  const [counter, setCounter] = useState(0);

  const [selectedFileUrl, setSelectedFileUrl] = useState([]);

  const [buttonElementsArray, setButtonsElementsArray] =
    useState(buttonElements);

  const [visible, setVisible] = useState(3);

  const showMoreImgs = () => {
    setVisible((prevValue) => prevValue + 3);
  };

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

  const createDraggableComponent = (img) => {
    setCounter(counter + 1);
    setDraggableImage([...draggableImage, counter]);
    setImgGeneretedFromDraggableImg([...imgGeneretedFromDraggableImg, img]);
  };

  useEffect(() => {
    if (!selectedFileByDrop) return;
    updateUploads();
  }, [selectedFileByDrop]);

  useEffect(() => {
    const storageImgRef = ref(storage, `images/`);
    listAll(storageImgRef)
      .then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
          setImgUrlArray(urls);
        });
        // setImgUrlArray(res.items);
        res.prefixes.forEach((folderRef) => {
          // console.log(folderRef);
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
      })
      .catch((error) => {
        console.log(error);
        // Uh-oh, an error occurred!
      });
  }, []);

  const filterButtonsElements = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredButtonsElements = buttonElements.filter((elements) =>
      elements.name.toLowerCase().includes(search)
    );
    setButtonsElementsArray(filteredButtonsElements);
  };

  return (
    <MainContainer id="test">
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>PLANOS DE FUNDO SALVOS</Text>
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginLeft: "10px",
              }}
            >
              {imgUrlArray.slice(0, visible).map((urls, index) => (
            <UploadedImgsButton onClick={() => setImgUrl(urls)}>
              <UploadedImgs src={urls} key={index} alt="" />
            </UploadedImgsButton>
          ))}
            </div>
          </div>
          <button
              style={{
                backgroundColor: "transparent",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() => showMoreImgs()}
            >
              <Text
                title="Carregar mais imagens"
                style={{ fontSize: 12, marginTop: "10px", fontWeight: "bold" }}
              >
                Mostrar mais...
              </Text>
            </button>
        </div>

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
            <EquipsInput
              placeholder="Buscar equipamento..."
              onChange={(event) => filterButtonsElements(event)}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "100px",
            height: "500px",
            width: "350px",
          }}
        >
          {buttonElementsArray.map((items, id) =>
            items.name ? (
              <CreateElButton
                key={id}
                onClick={() => createDraggableComponent(items.img)}
              >
                <img
                  src={items.img}
                  alt={items.name}
                  style={{ width: "150px" }}
                />
                {items.name}
              </CreateElButton>
            ) : (
              <h1>Tem nada aqui nao</h1>
            )
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}></div>
      </ScrollableContainer>
    </MainContainer>
  );
}

export default FirstSection;
