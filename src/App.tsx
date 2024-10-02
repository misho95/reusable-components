import Layout from "./components/layout";
import AccordionExample from "./components/accordion-example";
import ButtonExample from "./components/button-example";
import VideoExample from "./components/video-example";
import WindowsStyleCalendar from "./components/ui/windows-style-calendar";

function App() {
  return (
    <Layout>
      <ButtonExample />
      <AccordionExample />
      <VideoExample />
      <WindowsStyleCalendar />
    </Layout>
  );
}

export default App;
