import styled from "styled-components";

export const FooterContainer = styled.footer<{ isDale: boolean }>`
  grid-area: FT;
  background: ${(props) =>
    props.isDale
      ? ``
      : `linear-gradient(90deg, #32CD32 0%, #228B22 35%, #00171A 100%)`};

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom:0px;
  height: 70px;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;

  animation-name: ${(props) => (props.isDale ? `dele` : ``)};
  animation-iteration-count: infinite;
  animation-duration: 5s;
  @keyframes dele {
    0% {
      background-color: darkgoldenrod;
    }
    20% {
      background-color: darkred;
    }
    40% {
      background-color: darkblue;
    }
    60% {
      background-color: darkmagenta;
    }
    80% {
      background-color: darksalmon;
    }
    100% {
      background-color: darkgoldenrod;
    }
  }
`;

// TO DO - REFATORAR ISSO NÉ IRMÃO TÁ FEIAO ESSA REPETIÇÃO AI

export const SoundButton = styled.button<{ isDale: boolean }>`
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 10px;
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  width: 220px;

  color: #000;
  font-size: 20px;
  font-weight: bold;

  background-image: url(https://www.svgrepo.com/show/393821/sound.svg);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 7px 10px;
  background-size: 25px;

  animation-name: ${(props) => (props.isDale ? `dale` : ``)};
  animation-iteration-count: infinite;
  animation-duration: 5s;

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`;

export const PauseButton = styled.button<{ isDale: boolean }>`
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 10px;
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  width: 220px;

  color: #000;
  font-size: 20px;
  font-weight: bold;

  background-image: url(https://www.svgrepo.com/show/44880/pause.svg);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 7px 10px;
  background-size: 25px;

  animation-name: ${(props) => (props.isDale ? `dale` : ``)};
  animation-iteration-count: infinite;
  animation-duration: 5s;

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`;

export const StopButton = styled.button<{ isDale: boolean }>`
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 10px;
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
  width: 220px;

  color: #000;
  font-size: 20px;
  font-weight: bold;

  background-image: url(https://www.svgrepo.com/show/53664/stop.svg);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 7px 10px;
  background-size: 25px;

  animation-name: ${(props) => (props.isDale ? `dale` : ``)};
  animation-iteration-count: infinite;
  animation-duration: 5s;
  @keyframes dale {
    0% {
      left: 0px;
      background-color: red;
    }
    20% {
      left: -600px;
      background-color: blue;
    }
    40% {
      left: 600px;
      background-color: green;
    }
    60% {
      left: -600px;
      background-color: yellow;
    }
    80% {
      background-color: purple;
      left: 600px;
    }
    100% {
      left: 0px;
      background-color: red;
    }
  }

  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &:active {
    background-color: #eeeeee;
  }

  &:focus {
    outline: none;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
      0 0 0 3px #c8dafc;
  }

  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);
    cursor: not-allowed;
  }
`;

export const Text = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  font-family: "Inter", sans-serif;
`;

export const SoundSection = styled.div`
  position: absolute;
  left: 100px;
`;

export const SocialMedia = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  right: 30px;

  a {
    margin: 5px;
  }
`;
