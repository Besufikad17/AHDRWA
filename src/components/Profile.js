import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './assets/style.css';

import {
    Card,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    NavLink,
    CardBody} from 'reactstrap';
import { logout } from "../features/userSlice";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Profile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState({
        isOp: false
    });

    const toggle = () => {
        setIsOpen({ isOp: !isOpen.isOp })
    }

    const submit = e => {
        e.preventDefault();
        dispatch(logout())
    }


    return (
        <div>
            <NavLink onClick={toggle} href="#" style={{ color: "black" }}>
                {user.username}
            </NavLink>

            <Modal isOpen={isOpen.isOp} toggle={toggle}>
                <ModalHeader><h5>Profile</h5></ModalHeader>
                <ModalBody>
                    <Card body className="text-center" style={{
                        background: "transparent",
                        borderStyle: "none"
                    }}>
                        <CardBody style={{ textAlign: "left" }}>
                            <nav>
                                <ul>
                                    <li>Username:</li>
                                    <li> {user.username} </li> <li /><li /><li /><li />
                                </ul>
                            </nav><br />
                            <nav>
                                <ul>
                                    <li>Email:</li>
                                    <li>{user.email}</li> <li /><li />
                                </ul>
                            </nav><br />
                            <nav>
                                <ul>
                                    <li>Id:</li>
                                    <li>{user.id}</li> <li /><li />
                                </ul>
                            </nav><br />
                            <nav>
                                <ul>
                                    <li>subscription:</li>
                                    <li> {user.subscription} </li> <li /><li /><li /><li />
                                </ul>
                            </nav><br />
                            <nav>
                                <ul>
                                    <li><Button style={{ background: "#292c34" }} onClick={submit}>
                                        Logout
                                    </Button></li>
                                </ul>
                            </nav>
                        </CardBody>
                    </Card>
                </ModalBody></Modal>
        </div >
    )
}

export default Profile;