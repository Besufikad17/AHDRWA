import axios from "axios";
import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";
import classNames from "../index.css";
import Popup from "./Popup";
import { Bar } from "react-chartjs-2";
import Plot from 'react-plotly.js';
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
        // console.log(base64);
        this.setState({
            base64: base64,
            isOpen: !this.state.isOpen
        })
        console.log(this.state);
        const file = this.dataURLtoFile(base64, 'p.png')

        var data = new FormData()
        data.append('image', file, 'p.png')

        var vals = []
        var obj = {};
        var self = this;

        axios.post('http://192.168.0.66:4545/api/digit/recognition/', data)
            .then(function (response) {
                vals = response.data
                // for(var i = 0; i < vals.length; i++){
                //   obj[vals[i][1]] = vals[i][0]
                // }
                // self.setState({
                //     values: response.data,
                //     isOpen: !self.state.isOpen
                // })

                console.log(self.state.values);

                const temp = [];
                vals.forEach(v => {
                    temp.push(v[0] * 1000);   
                });
                
                self.setState({
                    values: temp,
                    isOpen: !self.state.isOpen
                })
                console.log('Hyu', self.state.values);
                // this.exportToJsonFile(obj);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                {this.state.values.length > 0 ? (
                    // <Popup data={this.state.values}/>this.state.values.map(v => v[1])
                    // "#469990",
                    // "#000075",
                    // "#e6194B",
                    // "#f58231",
                    // "#ffe119",
                    // "#bfef45",
                    // "#3cb44b",
                    // "#42d4f4",
                    // "#4363d8",
                    // "#911eb4",
                    // "#f032e6",
                    // "#a9a9a9",
                    // "#fabed4",
                    // "#ffd8b1",
                    // "#fffac8",
                    // "#aaffc3",
                    // "#dcbeff",
                    // "#000000"
                    <div >
                        {/* <Bar
                            data={{
                                label: ["1", "2", "3"],
                                datasets: [
                                    {
                                        label: "Recognition result",
                                        data: [12, 34, 56],
                                        backgroundColor: [
                                            "#800000",
                                            "#9A6324",
                                            "#808000",
                                           
                                        ]
                                    }
                                ]
                            }}
                        /> */}
                        <Plot
                            data={[
                                { type: 'bar', x: this.state.values.map(v => v[1]), y: this.state.values.map(v => v[1] )* 100 },
                            ]}
                            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
                        />
                        {/* <Popup d={this.state.base64} /> */}

                    </div>
                ) : (
                    <div />
                )}
            </div >
        )
    }
}

export default Drawer;