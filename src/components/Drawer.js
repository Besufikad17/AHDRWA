import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import classNames from "../index.css";

class Drawer extends Component {
    
    state = {
        color: "#ffc600",
        width: 400,
        height: 400,
        brushRadius: 10,
        lazyRadius: 12
    }

    render(){
        return (
            <div>
                <div className={classNames.tools}>
                    <button
                        onClick={() => {
                            localStorage.setItem(
                                "savedDrawing",
                                this.saveableCanvas.getSaveData()
                            );
                            console.log(localStorage.getItem("savedDrawing"));

                            this.loadableCanvas.loadSaveData(
                                localStorage.getItem("savedDrawing")
                            );
                        }}
                    >
                        Save
                    </button>
                    </div>
                <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.color}
                    brushRadius={this.state.brushRadius}
                    lazyRadius={this.state.lazyRadius}
                    canvasWidth={this.state.width}
                    canvasHeight={this.state.height}
                />
                <CanvasDraw
                    disabled
                    hideGrid
                    ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                    saveData={localStorage.getItem("savedDrawing")}
                />
           </div >
        )
    }
}

export default Drawer;