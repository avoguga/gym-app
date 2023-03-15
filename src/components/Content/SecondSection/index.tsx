import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CreateElButton,
  DropZone,
  EquipsInput,
  HideButton,
  InputIcon,
  MainContainer,
  ScrollableContainer,
  ShowButton,
  ShowSavedBackgroudButton,
  Text,
  UploadedImgs,
  UploadedImgsButton,
} from "./styles";
import gsap from "gsap";
import DragRotate from "gsap/Draggable";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  updateMetadata,
  getMetadata,
} from "firebase/storage";
import { storage, db } from "../../../firebase";
import Lupa from "../../../assets/magnifier-glass_icon-icons.com_71148.svg";
import buttonElements from "./buttonElements";
import RightArrow from "../../../assets/left-arrow-svgrepo-com.svg";
import LeftArrow from "../../../assets/right-arrow-svgrepo-com.svg";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";

gsap.registerPlugin(DragRotate);

function SecondSection({
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
  setImgGeneretedFromDraggableImg,
  isVisible,
  setIsVisible,
}) {
  // Consts

  // Hooks

  const [counter, setCounter] = useState(0);

  const [cacheUrlsArray, setCacheUrlsArray]: any = useState([]);

  const [selectedFileUrl, setSelectedFileUrl] = useState([]);

  const [buttonElementsArray, setButtonsElementsArray] =
    useState(buttonElements);

  const [visible, setVisible] = useState(-3);

  const [isSavedBackgroundVisible, setIsSavedBackgroundVisible] =
    useState(false);

  // Functions

  const hideComponent = () => {
    setIsVisible(!isVisible);
  };

  const showMoreImgs = () => {
    setVisible((prevValue) => prevValue - 3);
  };

  const showLessImgs = () => {
    setVisible((prevValue) => {
      if (prevValue <= -3) return prevValue;
      return prevValue + 3;
    });
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
          const gymWebRef = collection(db, "gym-web");
          setImgUrl(url);
          setDoc(doc(gymWebRef, "changeTimestamp"), {
            timestamp: Date.now(),
          });
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
    caches.open("imgs").then((cache) => {
      cache.matchAll().then((res) => {
        res.forEach((img) => {
          img.blob().then((blob) => {
            const url = URL.createObjectURL(blob);
            setCacheUrlsArray((prev) => [...prev, url]);
            setImgUrlArray((prev) => [...prev, url]);
          });
        });
      });
    });

    const storageImgRef = ref(storage, `images/`);
    if (cacheUrlsArray.length === 0) {
      listAll(storageImgRef).then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises)
          .then((urls) => {
            caches.open("imgs").then((cache) => {
              cache.addAll(urls);
              setCacheUrlsArray(urls);
              setImgUrlArray(urls);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      setImgUrlArray(cacheUrlsArray);
    }
  }, []);

  useEffect(() => {
    const storageImgRef = ref(storage, `images/`);
    listAll(storageImgRef)
      .then((res) => {
        let promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises).then((urls) => {
          if (urls !== imgUrlArray) {
            caches.open("imgs").then((cache) => {
              cache.addAll(urls);
            });
            setImgUrlArray(urls);
          }
        });
      })
      .catch((error) => {
        console.log(error);
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
    <>
      {isVisible ? (
        <>
          <HideButton onClick={hideComponent}>
            <img src={LeftArrow} alt="" />
          </HideButton>
          <MainContainer id="test">
            <ScrollableContainer>
              <form>
                <DropZone {...getRootProps()}>
                  <input type="file" {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <Text>
                      Arraste aqui suas imagens, ou clique aqui para
                      seleciona-las
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
                <ShowSavedBackgroudButton
                  onClick={() =>
                    setIsSavedBackgroundVisible(!isSavedBackgroundVisible)
                  }
                >
                  {isSavedBackgroundVisible ? "Esconder planos de fundo salvos" : "Mostrar planos de fundo salvos"}
                </ShowSavedBackgroudButton>
                {!isSavedBackgroundVisible ? null : (
                  <div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          marginLeft: "10px",
                        }}
                      >
                        {imgUrlArray.slice(visible).map((urls: string, index: number) => (
                          <UploadedImgsButton key={index} onClick={() => setImgUrl(urls)}>
                            <UploadedImgs src={urls} key={index} alt="" />
                          </UploadedImgsButton>
                        ))}
                      </div>
                    </div>
                    <div>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          border: "none",
                          marginRight: "20px",
                        }}
                        onClick={() => showMoreImgs()}
                      >
                        <Text
                          title="Carregar mais imagens"
                          style={{
                            fontSize: 12,
                            marginTop: "10px",
                            fontWeight: "bold",
                            marginLeft: "80px",
                          }}
                        >
                          Mostrar mais...
                        </Text>
                      </button>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          border: "none",
                        }}
                        onClick={() => showLessImgs()}
                      >
                        <Text
                          title="Carregar menos imagens"
                          style={{
                            fontSize: 12,
                            marginTop: "10px",
                            fontWeight: "bold",
                          }}
                        >
                          Mostrar menos...
                        </Text>
                      </button>
                    </div>
                  </div>
                )}
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
                    width: "100%",
                    height: "35px",
                    marginTop: "20px",
                  }}
                >
                  <Text style={{ fontSize: 18, marginTop: "7px" }}>
                    EQUIPAMENTOS DISPONÍVEIS
                  </Text>
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
        </>
      ) : (
        <ShowButton onClick={hideComponent}>
          <img src={RightArrow} alt="" />
        </ShowButton>
      )}
    </>
  );
}

export default SecondSection;
