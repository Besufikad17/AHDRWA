import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import axios from "axios";
import ReactJson from 'react-json-view'


import {
    Card,
    Modal,
    ModalHeader,
    ModalBody,
    CardBody,
    Row,
    Col,
    CardTitle
} from 'reactstrap';

const Popup = ({ d }) => {
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

    useEffect(() => {
        if (d) {
            const base64 = d;
            const file = dataURLtoFile(base64, 'p.png')
            var fdata = new FormData()
            fdata.append('image', file, 'p.png')

            var obj = {};

            axios.post('http://192.168.0.66:4545/api/digit/recognition/', fdata)
                .then(function (response) {

                    response.data.map(v => {
                        obj[v[1]] = v[0] * 100
                    })
                    localStorage.setItem("result", JSON.stringify(obj));
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [])


    var jdata = JSON.parse(localStorage.getItem("result"));
    var xs = []
    var ys = []

    for (const prop in jdata) {
        xs.push(prop)
        ys.push(jdata[prop])
    }

    const toggle = () => {
        setIsOpen({ isOp: !isOpen.isOp })
    }

    return (
        <Modal isOpen={isOpen.isOp} toggle={toggle} size="xl"  aria-labelledby="contained-modal-title-vcenter"centered>
            <ModalHeader><h5>Recognition result</h5></ModalHeader>
            <ModalBody>

                <Row>
                    <Col sm="6">
                        <Card body>
                            <CardTitle tag="h5">
                                Chart
                            </CardTitle>
                            <CardBody style={{ textAlign: "left" }}>
                                        <Chart chartData={{
                                            labels: xs,
                                            datasets: [
                                                {
                                                    label: 'My First Dataset',
                                                    data: ys,
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.2)',
                                                        'rgba(255, 159, 64, 0.2)',
                                                        'rgba(255, 205, 86, 0.2)',
                                                        'rgba(75, 192, 192, 0.2)',
                                                        'rgba(54, 162, 235, 0.2)',
                                                        'rgba(153, 102, 255, 0.2)',
                                                        'rgba(201, 203, 207, 0.2)'
                                                    ]
                                                }
                                            ]
                                        }} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6" style={{mariginRight: "100px"}}>
                        <Card body>
                            <CardTitle tag="h5">
                               JSON output
                            </CardTitle>
                            <CardBody>
                                <ReactJson src={jdata} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default Popup;