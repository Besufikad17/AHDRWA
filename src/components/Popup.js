import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import Plot from 'react-plotly.js';
import axios from "axios";

import {
    Card,
    Modal,
    ModalHeader,
    ModalBody,
    CardBody
} from 'reactstrap';

const Popup = ({ d }) => {
    console.log(d, 'props')
    const [isOpen, setIsOpen] = useState({
        isOp: true
    });

    const dataURLtoFile = (dataurl, filename) => {

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

    const [data, setData] = useState({});
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);

    useEffect(() => {
        if (d) {
            const base64 = d;
            // console.log(base64);
            const file = dataURLtoFile(base64, 'p.png')
            // console.log(file);
            var fdata = new FormData()
            fdata.append('image', file, 'p.png')

            var vals = []
            var obj = {};

            axios.post('http://192.168.0.66:4545/api/digit/recognition/', fdata)
                .then(function (response) {
                    console.log(response.data);
                    setData(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [])


    const toggle = () => {
        setIsOpen({ isOp: !isOpen.isOp })
    }

    return (
        <Modal isOpen={isOpen.isOp} toggle={toggle}>
            <ModalHeader><h5>Subscription</h5></ModalHeader>
            <ModalBody>
                <Card body className="text-center" style={{
                    background: "transparent",
                    borderStyle: "none"
                }}>
                    <CardBody style={{ textAlign: "left" }}>
                        {/* <Chart chartData={chartData} /> */}
                        <Plot
                            data={[
                                { type: 'bar', x: x, y: y },
                            ]}
                            layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
                        />
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
}

export default Popup;