import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import { Context } from "./contexts/AppContext";
import { Layout } from "./styles/Layout";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import Content from "./components/Content";
import Sound from "./assets/dale.mp3";

// Types - Interfaces

interface IUser {
  name: string;
}

// Config Firebase

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
// };

/** Initialize Firebase */
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

function App() {
  // Hooks
  const [userProfile, setUserProfile] = useState<IUser>();
  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();
  const [error, setError] = useState();
  const [isUserLogIn, setIsUserLogIn] = useState(true);

  const audioTune = new Audio(Sound);

  const [audio, setAudio] = useState(audioTune);
  const [playInLoop, setPlayInLoop] = useState(false);
  const [isDale, setIsDale] = useState(false);

  useEffect(() => {
    audioTune.load();
  }, []);

  useEffect(() => {
    audioTune.loop = playInLoop;
  }, [playInLoop]);

  /** Toca a musica */
  const playSound = () => {
    audio.play();
    setIsDale(true);
  };

  /** Pausa a musica */
  const pauseSound = () => {
    setIsDale(false);
    audio.pause();
  };

  /** Para a musica */
  const stopSound = () => {
    setIsDale(false);
    audio.pause();
    audio.currentTime = 0;
  };

  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const name: any = result.user.displayName;
  //       const email: any = result.user.email;
  //       const profilePic: any = result.user.photoURL;

  //       setUserName(name);
  //       setUserEmail(email);
  //       setUserProfile(profilePic);
  //       setIsUserLogIn(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError(error);
  //     });
  // };

  return (
    <Layout>
      <Context.Provider
        value={{
          userName,
          userProfile,
          // signInWithGoogle,
          isUserLogIn,
          error,
          playSound,
          pauseSound,
          stopSound,
          isDale,
        }}
      >
        <MainHeader />
        <Content />
        <Footer />
      </Context.Provider>
    </Layout>
  );
}

export default App;
