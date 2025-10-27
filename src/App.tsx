import "./App.css";
import { items } from "./assets/items";
import VirtualList_Library from "./components/VirtualList_Library";
import VirtualList from "./components/VirtualList_Manual";

function App() {
  return (
    <>
      {/* <VirtualList items={items} itemHeight={5} height={80} overscan={5} /> */}
      <VirtualList_Library
        items={items}
        itemHeight={5}
        height={80}
        overscan={5}
      />
    </>
  );
}

export default App;
