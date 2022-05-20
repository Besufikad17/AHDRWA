import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";

export default function App() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState();

  const handleExport = () => {
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
  };

  return (
    <div className="App">
      <h1>React-Canvas-Draw</h1>
      <h2>Save draw to image base 64!</h2>
      <hr />
      <button
        type="button"
        style={{ backgroundColor: "#0A71F1", color: "white" }}
        onClick={handleExport}
      >
        Export Drawing
      </button>
      <br />
      <img src={drawing} alt="exported drawing" />
      <CanvasDraw
        lazyRadius={0}
        brushRadius={2}
        canvasWidth={"339px"}
        canvasHeight={"486px"}
        ref={canvasRef}
      />
    </div>
  );
}