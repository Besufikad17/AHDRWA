import React, { useState } from "react";
import './assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useNavigate } from "react-router-dom";

import {
    Card,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    CardBody,
    NavbarText
} from 'reactstrap';

const Subscription = () => {
    const user = useSelector(selectUser);
    const [isOpen, setIsOpen] = useState({
        isOp: true
    });

    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen({ isOp: !isOpen.isOp })
        navigate("/")
    }

    return (
        <div>
            {user ? (
                <Modal isOpen={isOpen.isOp} toggle={toggle}>
                    <ModalHeader><h5>Subscription</h5></ModalHeader>
                    <ModalBody>
                        <Card body className="text-center" style={{
                            background: "transparent",
                            borderStyle: "none"
                        }}>
                            <CardBody style={{ textAlign: "left" }}>
                                <p> Dear {user.username} u have sucessfully registerd </p><p>use your id {user.id} to subscribe for more features</p>
                                <nav>
                                    <ul>
                                        <li><Button style={{ background: "#292c34" }} onClick={toggle}>
                                            <a href="https://t.me/ahdrwa_bot" target="_blank" style={{ textDecoration: "none" }}>Subscribe</a>
                                        </Button></li>
                                        <li><Button style={{ background: "#292c34" }} onClick={toggle}>No thanks</Button></li>
                                    </ul>
                                </nav>
                            </CardBody>
                        </Card>
                    </ModalBody>
                </Modal>
            ) : (
                <div class="row">
                    <div class="col-md-8 mx-auto">
                        <NavbarText style={{ fontSize: "26x", marginLeft: "auto", marginRight: "auto"}}>
                            Oops! you either have to
                            Register or Login
                        </NavbarText>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Subscription;