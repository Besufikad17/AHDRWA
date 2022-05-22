import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FormGroup,
    Input,
    Card,
    CardText,
    InputGroup,
    Button,
    Alert,
    Modal,
    ModalHeader,
    ModalBody,
    NavLink
} from 'reactstrap';
import { register } from "../features/userSlice";
import { getError, setErrorMsg } from "../features/errorSlice";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isOpen, setIsOpen] = useState({
        isModalOpen: false,
        isDropDownOpen: false
    });

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    }

    const msg = useSelector(getError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggleModal = () => {
        setIsOpen({
            isModalOpen: !isOpen.isModalOpen,
            isDropDownOpen: isOpen.isDropDownOpen
        })
    }


    const submit = e => {
        e.preventDefault();

        const newUser = {
            username,
            email,
            password,
            isRegisterd: true
        };
        console.log(newUser);

        axios.post('https://ahdrwa-backend1.herokuapp.com/api/signup', newUser)
            .then(res => {
                dispatch(register(res.data.user))
                toggleModal();
                navigate("/subscribe");
            }).catch(err => {
                alert(err.response.data.msg);
                dispatch(setErrorMsg(err.response.data.msg))
            })
    }

    return (
        <div>
            <NavLink href="#" onClick={toggleModal} style={{ color: "#292c34" }}>
                Register
            </NavLink>

            <Modal isOpen={isOpen.isModalOpen} toggle={toggleModal}>
                <ModalHeader>Register</ModalHeader>
                <ModalBody>
                    <Card body className="text-center" style={{
                        background: "transparent",
                        borderStyle: "none"
                    }}>
                        <CardText>
                            {msg ? (
                                <Alert color="danger">{msg}</Alert>) : (null)}

                            <FormGroup>
                                <Input autoComplete="false"
                                    type="text"
                                    placeholder="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                /><br />
                                <Input autoComplete="false"
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                /><br />
                                <Input autoComplete="false"
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i onClick={togglePasswordVisibility}
                                     style= {{ 
                                         position: "absolute",
                                         top: "37%",
                                         right: "7%"
                                     }}
                                >
                                    {passwordShown ? (
                                        <AiFillEye />
                                    ) : (
                                        <AiFillEyeInvisible />
                                    )
                                    }

                                </i>
                                <br />
                                <InputGroup>
                                    <input type="checkbox" id="remember-me" />
                                    <label for="remember-me"> Accept <a href={"/"} style={{ textDecoration: "none" }}>Terms and Policies</a> </label>
                                </InputGroup><br />
                                <Button style={{ background: "#292c34" }} onClick={submit}>
                                    Register
                                </Button>
                            </FormGroup>
                        </CardText>
                    </Card>
                </ModalBody>
            </Modal>
        </div >
    )

}


export default Register;