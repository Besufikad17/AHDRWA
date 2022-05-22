import React from "react";
import { CardGroup, Card, CardText, CardTitle, NavbarText } from "reactstrap";
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";

const Ex = () => {
    const user = useSelector(selectUser);
    const isLoggedIn = user ? true : false;
    
    return (
        <div>
            <CardGroup>
                <Card
                    body
                    className="text-center"
                    style={{
                        background: "#F2CB71"
                    }}
                >
                    <CardTitle tag="h5" style={{ fontSize: "36px" }}>
                        Standard
                    </CardTitle><br />
                    <CardText>
                        <ul style={{ listStyleType: "none", left: "-1px" }}>
                            <p><li style={{ fontSize: "24px" }}><AiOutlineCheck />10 requests per day</li><br /></p>
                            <p><li style={{ fontSize: "24px" }}><AiOutlineClose />JSON output</li><br /></p>
                            <li style={{ fontSize: "24px" }}><AiOutlineClose />Multiple digit recognition</li>
                        </ul>
                    </CardText>
                    {isLoggedIn ? (
                        user.subscription === "standard" || user.subscription === "premium" || user.subscription === "platnium" ? (
                            <NavbarText style={{ backgroundColor: "#C39A69", fontSize: "18px" }}>Claimed</NavbarText>
                        ) : (
                            <p> Enter your id <a href="https://t.me/CSEC_Project_Bot" target="_blank">here</a> to get the offer</p>
                        )
                    ): (
                        <p> Enter your id <a href="https://t.me/CSEC_Project_Bot" target="_blank">here</a> to get the offer</p>
                    )}
                </Card>
                <Card
                    body
                    className="text-center"
                    style={{
                        background: "#54BED4"
                    }}
                >
                    <CardTitle tag="h5" style={{ fontSize: "36px" }}>
                        Premium
                    </CardTitle><br />
                    <CardText>
                        <ul style={{ listStyleType: "none", left: "-1px" }}>
                            <p><li style={{ fontSize: "24px" }}><AiOutlineCheck />50 requests per day</li><br /></p>
                            <p><li style={{ fontSize: "24px" }}><AiOutlineCheck />JSON output</li><br /></p>
                            <li style={{ fontSize: "24px" }}><AiOutlineClose />Multiple digit recognition</li>
                        </ul>
                    </CardText>
                    { isLoggedIn ? (
                        user.subscription === "platnium" || user.subscription === "premiunm" ? (
                            <NavbarText style={{ backgroundColor: "#1892FF", fontSize: "18px" }}>Claimed</NavbarText>
                        ) : (
                            <p> Enter your id <a href="https://t.me/CSEC_Project_Bot" target="_blank" style={{color:"black"}}>here</a> to get the offer</p>
                        )
                    ):(
                        <p> Enter your id <a href="https://t.me/CSEC_Project_Bot" target="_blank" style={{color:"black"}}>here</a> to get the offer</p>
                    )}
                </Card>
                <Card
                    body
                    className="text-center"
                    style={{
                        background: "#DDDADF"
                    }}
                >
                    <CardTitle tag="h5" style={{ fontSize: "36px" }}>
                        Platnium
                    </CardTitle><br />
                    <CardText>
                        <ul style={{ listStyleType: "none", left: "-1px" }}>
                            <p><li style={{ fontSize: "24px" }}><AiOutlineCheck />Unlimited requests per day</li><br /></p>
                            <p><li style={{ fontSize: "24px" }}><AiOutlineCheck />JSON output</li><br /></p>
                            <li style={{ fontSize: "24px" }}><AiOutlineCheck />Multiple digit recognition</li>
                        </ul>
                    </CardText>
                    {isLoggedIn ? (
                        user.subscription === "platnium" ? (
                            <NavbarText style={{ fontSize: "18px" }}>Claimed</NavbarText>
                        ) : (
                            <p> Enter your id <a href="https://t.me/CSEC_Project_Bot" target="_blank">here</a> to get the offer</p>
                        )
                    ): (
                        <p> Enter your id <a href="https://t.me/CSEC_Project_Bot" target="_blank">here</a> to get the offer</p>
                    )}
                </Card>
            </CardGroup>
        </div>
    )
}

export default Ex;