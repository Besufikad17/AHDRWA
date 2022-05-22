import React from 'react';
import { FaTelegram, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer-distributed">

                <div className="footer-left">
                    <h3><span>፱፻፲፫</span></h3>

                    <p><br/>
                        <a className="footer-links" href="#sec2">Services</a>
                        | 
                       <a className="footer-links" href="#sec">Contact</a>
                    </p>

                    <p className="footer-company-name">© 2022 ፱፻፲፫</p>
                </div>

                <div className="footer-center">
                    <div>
                        <p><span>Addis Ababa, Ethiopia</span></p>
                    </div>
                    <div>
                        <p>+251973132132</p>
                    </div>
                    <div>
                        <p><a href="#">support@AHDRWA.com</a></p>
                    </div>
                </div>
                <div className="footer-right">
                    <p className="footer-company-about">
                        <span><a href="https://stupendous-meringue-4b95b0.netlify.app/" style={{textDecoration:"none"}}>About</a></span>
                    </p>
                    <i><a  style={{ marginRight: "3px"}} href="https://t.me/CSEC_Project_Bot"><FaTelegram /></a></i>
                    <i><a href="https://github.com/Besufikad17/AHDRWA"><FaGithub /></a></i>
                </div>
            </footer>
        </div>
    )
}

export default Footer;