import React, { Fragment, useState, useEffect } from 'react';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile';
import Register from './Register';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from "../features/userSlice";
import {
    Navbar,
    Nav,
    NavbarBrand,
    Collapse,
    NavbarToggler,
    NavbarText,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';


const Header = () => {

    const dispatch = useDispatch();

    const [componentProperties, setComponentProperties] = useState({
        isDropdownOpen: false,
        isModalOpen: false
    })

    const toggle = (e) => {
        e.preventDefault();
        setComponentProperties({
            isDropdownOpen: !componentProperties.isDropdownOpen,
            isModalOpen: componentProperties.isModalOpen
        })
    };

    const [id, setId] = useState("");
    const user = useSelector(selectUser);

    if(user){
        setId(user.id)
    }

    const authLinks = (
        < Fragment >< Profile /></Fragment >
    )

    const guestLinks = [
        < Fragment >< Login /></Fragment >,
        < Fragment >< Register /></Fragment >
    ]

    // useEffect(() =>{
    //     axios.get('http://localhost:5000/api/user', {id})
    //         .then(res => {
    //             dispatch(login(res.data.user));
    //         }).catch(err => {
    //             alert(err.response.data.msg)
    //         })
    // }, [id])

    return (
        <div>
            <Navbar
                color="faded"
                expand="md"
                light
            >
                <NavbarBrand href="/" style={{"color":"black"}}>
                ፱፻፲፫
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={componentProperties.isDropdownOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                    </Nav>

                    {user ? (
                        <NavbarText style={{"color":"#292c34"}} >{authLinks}</NavbarText>
                    ) : (
                        <NavbarText style={{"color":"#292c34"}} >{guestLinks}</NavbarText>
                    )}

                </Collapse></Navbar>
        </div>
    )
}


export default Header;
