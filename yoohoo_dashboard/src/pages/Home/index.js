import React from "react";
import { Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

const Home = () => {
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
        });
    }, []);

    const handleUpload = (e) => {
        e.preventDefault();

        let formData = JSON.stringify({
            lat: lat,
            long: long,
        });
        console.log(formData);
        // axios({
        //     // Endpoint to send files
        //     url: "http://localhost:8000/api/user/location",
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },

        //     // Attaching the form data
        //     data: formData,
        // })
        //     // Handle the response from backend here
        //     .then((res) => {
        //         localStorage.setItem("data", JSON.stringify(res.data));
        //         console.log(res.data);
        //         // history.push("/login");
        //     })

        //     // Catch errors if any
        //     .catch((error) => {
        //         if (error.response) {
        //             this.errors(error.response.message);
        //         } else if (error.request) {
        //             console.log("error.request");
        //         } else {
        //             console.log("Error", error);
        //         }
        //         console.log("rejected");
        //     });
    };
    return (
        <div>
            <div id="images-container">
                {/* <Image
                    src="/assets/images/imgsave.jpg"
                    alt="Image"
                    id="small-image"
                ></Image> */}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleUpload(e)}
                >
                    Location
                </Button>
            </div>
        </div>
    );
};

export default Home;
