import "./App.css";
import Flow from "./Flow";
import "reactflow/dist/style.css";
import CytoscapeComponent from "react-cytoscapejs";

function App() {
  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 100, y: 100 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 200, y: 200 } },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    },
  ];

  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Flow />
      </div>
    </>
  );
}

export default App;
