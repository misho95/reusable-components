import Layout from "./components/layout";
import AccordionExample from "./components/accordion-example";
import ButtonExample from "./components/button-example";
import VideoPlayer from "./components/ui/video-player";

function App() {
  return (
    <Layout>
      <ButtonExample />
      <AccordionExample />
      <VideoPlayer />
    </Layout>
  );
}

export default App;
