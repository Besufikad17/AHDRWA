import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import classNames from "../index.css";
import Popup from "./Popup";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

class Drawer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            color: "#ffc600",
            width: 400,
            height: 400,
            brushRadius: 10,
            lazyRadius: 12,
            isOpen: false,
            base64: "",
            values: [],
        }
    }


    dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    exportToJsonFile(jsonData) {
        let dataStr = JSON.stringify(jsonData);
        console.log(dataStr);
        let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        let exportFileDefaultName = 'data.json';

        let linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    submit = () => {
        localStorage.setItem(
            "savedDrawing",
            this.saveableCanvas.getSaveData()
        );

        this.loadableCanvas.loadSaveData(
            localStorage.getItem("savedDrawing")
        );

        const base64 = this.saveableCanvas.getDataURL();
        console.log(base64);
        this.setState({
            base64: base64,
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-center flex-nowrap">
                    <div>
                        <br />
                        <CanvasDraw
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushColor={this.state.color}
                            brushRadius={this.state.brushRadius}
                            lazyRadius={this.state.lazyRadius}
                            canvasWidth={this.state.width}
                            canvasHeight={this.state.height}
                        />
                    </div>
                    <div><br />
                        <CanvasDraw
                            disabled
                            hideGrid
                            ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
                            saveData={localStorage.getItem("savedDrawing")}
                        />
                    </div>
                </div>
                <div className={classNames.tools}>
                    <button
                        style={{ backgroundColor: "#292c34", color: "white", marginRight: "10px", marginTop: "10px" }}
                        onClick={this.submit}>
                        Submit
                    </button>
                    <button
                        style={{ backgroundColor: "#AB7F4C", color: "white", marginRight: "10px", marginTop: "10px" }}
                        onClick={() => {
                            this.saveableCanvas.eraseAll();
                        }}
                    >
                        Erase
                    </button>
                </div>
                {this.state.isOpen ? (
                    <div >
                        <Popup d={this.state.base64} />
                    </div>
                ) : (
                    <div />
                )}
            </div >
        )
    }
}

export default Drawer;