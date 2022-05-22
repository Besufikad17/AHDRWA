import React from "react";
import Header from "./Header";
import Drawer from "./Drawer";
import Footer from "./footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';

import Ex from "./Experimental";

const Home = () => {

    return (
        <div>
            <Header />
            <Drawer />
            <br /><br />
            <Ex />
            <Footer />
        </div>
    )
}

export default Home;