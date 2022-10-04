import Footer from "./components/Footer";
import MainHeader from "./components/MainHeader";
import { Context } from "./contexts/AppContext";
import { Layout } from "./styles/Layout";
import Content from "./components/Content";

function App() {
  // Hooks

  return (
    <Layout>
      <Context.Provider
        value={{

     
        }}
      >
        <MainHeader />
        <Content />
      </Context.Provider>
    </Layout>
  );
}

export default App;
