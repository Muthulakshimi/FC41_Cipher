import React from "react";
import { Image, Button, Modal } from "react-bootstrap";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../../App.css";
import { Audio } from "../../components/Audio";
// import { WebcamCapture } from "../../components/Webcam";

import Webcam from "react-webcam";

const Home = () => {
    // Location
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(",");
        const byteString =
            splitDataURI[0].indexOf("base64") >= 0
                ? atob(splitDataURI[1])
                : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { type: mimeString });
    }

    // Image
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleMail = () => {
        // console.log("Mail clicked");
        const mailData = {
            userId: JSON.parse(localStorage.getItem("data")).id,
            message:
                "Emergency Here!!!. Please send some help to my shared location. ",
        };
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/user/mail",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            // Attaching the form data
            data: mailData,
        })
            // Handle the response from backend here
            .then((res) => {
                localStorage.setItem(
                    "location_response",
                    JSON.stringify(res.data)
                );
                console.log(res.data);
                // history.push("/login");
            });
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        console.log(imageSrc);
        const file = DataURIToBlob(imageSrc);
        const file1 = new File([file], "photo.jpg", {
            lastModified: 1534584790000,
        });
        // console.log(file1);
        const formData = new FormData();
        formData.append("file", file1);
        formData.append("userId", JSON.parse(localStorage.getItem("data")).id);
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/evidence",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            // Attaching the form data
            data: formData,
        }).then((res) => {
            // localStorage.setItem("data", JSON.stringify(res.data));
            console.log(res.data);
            // history.push("/login");
        });
    }, [webcamRef, setImage]);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
        });
        // axios
        //     .get("http://localhost:8000/api/public/audios/alertAudio.mp3")
        //     .then((resp) => {
        //         console.log(resp.data);
        //         setSrc(resp.data);
        //     });
    }, []);

    const handleUpload = (e) => {
        e.preventDefault();

        let formData = JSON.stringify({
            userId: JSON.parse(localStorage.getItem("data")).id,
            lat: lat,
            long: long,
            message:
                "Hello! We are here in the mailed location. \nWe might get in trouble. \nPlease be checking your mails or phone. \nThank You",
        });
        console.log(formData);
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/user/location",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("data")).token
                }`,
            },

            // Attaching the form data
            data: formData,
        })
            // Handle the response from backend here
            .then((res) => {
                localStorage.setItem(
                    "location_response",
                    JSON.stringify(res.data)
                );
                console.log(res.data);
                // history.push("/login");
            })

            // Catch errors if any
            .catch((error) => {
                if (error.response) {
                    this.errors(error.response.message);
                } else if (error.request) {
                    console.log("error.request");
                } else {
                    console.log("Error", error);
                }
                console.log("rejected");
            });
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
                {/* <button onClick={playAudio}>
                    <span>Play Audio</span>
                </button> */}
                <Audio />
                <Button variant="primary" onClick={handleShow}>
                    Camera
                </Button>
                <Button variant="primary" onClick={handleMail}>
                    Mail
                </Button>
                <Button variant="primary" href="tel:+919876543210">
                    Call
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Camera</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Click on Capture to click a photo and send it to
                        contacts.
                        <Webcam
                            audio={false}
                            height={300}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={300}
                            videoConstraints={videoConstraints}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={capture}>
                            Capture and Send
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Home;
