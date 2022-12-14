import React, { createRef, useEffect, useRef, useState } from "react";
import New from "../../DragglableContainer/new";
import {
  ImgContainer,
  ImgTextContainer,
  MainContainer,
  SendWorkoutButton,
  UploadedImg,
  StyledLoader,
} from "./styles";
import ImgIcon from "../../../assets/img-icon.jpeg";
import html2canvas from "html2canvas";
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

import { useToast } from '@chakra-ui/react';

export default function SecondSection({
  imgUrl,
  progress,
  draggable,
  isDisable,
  setIsDisable,
}) {

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [workoutName, setWorkoutName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef: any = useRef(null);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    // @ts-ignore
    fakeLink.style = "display:none;";

    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  const exportAsImageAndRemoveStylesFromDraggableElements = async (element) => {
    setLoading(true);
    const html = document.getElementsByTagName("html")[0];
    const body = document.getElementsByTagName("body")[0];
    let htmlWidth = html.clientWidth;
    let bodyWidth = body.clientWidth;

    const newWidth = element.scrollWidth - element.clientWidth;

    if (newWidth > element.clientWidth) {
      htmlWidth += newWidth;
      bodyWidth += newWidth;
    }

    html.style.width = htmlWidth + "px";
    body.style.width = bodyWidth + "px";

    const canvas = await html2canvas(element, {
      backgroundColor: "none",
      logging: true,
      allowTaint: false,
      useCORS: true, //to enable cross origin perms
    });

    const image = canvas.toDataURL("image/png", 1.0);

    // Caso queira baixar a img, descomente a linha abaixo

    // downloadImage(image, "filename");

    // Enviando pro Firebase

    canvas.toBlob(function (blob: any) {
      const storageRef = ref(storage, `workouts/${workoutName}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("O arquivo está upando:", progress);
        },
        (error) => {
          console.error(error);
          toast({
            title: `O sistema não pode enviar o treino!`,
            status: "error",
            isClosable: true,
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            toast({
              title: `O treino foi enviado!`,
              status: "success",
              isClosable: true,
            })
          });
        }
      );
    }, "image/png");

    setIsDisable(false);
    setLoading(false);
  };

  useEffect(() => {
    if (isDisable) {
      exportAsImageAndRemoveStylesFromDraggableElements(imgRef.current);
      onClose();
    }
  }, [isDisable]);

  useEffect(() => {
    if (!ImgIcon || imgUrl) {
      setLoading(true);
    }
  }, [imgUrl]);

  return (
    <MainContainer>
      <StyledLoader
        styles={{
          spinner: (base) => ({
            ...base,
            width: "100px",
            "& svg circle": {
              stroke: "rgba(0, 255, 213, 0.5)",
            },
          }),
        }}
        classNamePrefix="MyLoader_"
        active={loading}
        spinner
        text="Carregando sua imagem..."
      >
        <ImgContainer ref={imgRef}>
          {draggable}
          {!ImgIcon || imgUrl ? (
            <UploadedImg
              crossOrigin="anonymous"
              src={imgUrl}
              onLoad={() => setLoading(false)}
              alt="Imagem carregada"
            />
          ) : (
            <ImgTextContainer>
              <img
                style={{ width: "200px", margin: "10px" }}
                src={ImgIcon}
                alt=""
              />
              <h3 style={{ color: "white", fontSize: "30px" }}>
                SELECIONE UMA IMAGEM COMO PLANO DE FUNDO
              </h3>
            </ImgTextContainer>
          )}
        </ImgContainer>
      </StyledLoader>

      <div style={{}}>
        {/* <SendWorkoutButton onClick={() => setIsDisable(true)}>
          ENVIAR TREINO
        </SendWorkoutButton> */}

        <SendWorkoutButton onClick={onOpen}>ENVIAR TREINO</SendWorkoutButton>

        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Dê um nome para o treino!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome do treino</FormLabel>
                <Input ref={initialRef} placeholder="Nome do treino" onChange={(e) => setWorkoutName(e.target.value)}/>
              </FormControl>
{/* 
              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Last name" />
              </FormControl> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => setIsDisable(true)}>
                Salvar Treino
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* <img width={"100%"} height={"100%"} src={image} alt={"Screenshot"} /> */}
      </div>
    </MainContainer>
  );
}
