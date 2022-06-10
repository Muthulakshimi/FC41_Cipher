import React from "react";
import { Image } from "react-bootstrap";
import "../../App.css";

const Home = () => {
    return (
        <div>
            <div id="images-container">
                <Image
                    src="/assets/images/imgsave.jpg"
                    alt="Image"
                    id="small-image"
                ></Image>
            </div>
        </div>
    );
};

export default Home;
