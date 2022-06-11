import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useForceupdate from "use-force-update";

export const Login = () => {
    const history = useHistory();
    const forceUpdate = useForceupdate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUserEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangeUserPassword = (e) => {
        setPassword(e.target.value);
    };

    // useEffect(() => {
    //     if (localStorage.getItem("data")) {
    //         history.push("/home");
    //         forceUpdate();
    //     }
    // });

    const handleUpload = () => {
        // let newfiles = this.state.newfiles;

        // let formData = new FormData();

        // // Adding files to the formdata
        // formData.append("image", newfiles);
        // formData.append("name", "Name");
        let formData = JSON.stringify({
            email: email,
            password: password,
        });
        console.log(formData);
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/user/login",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            // Attaching the form data
            data: formData,
        })
            // Handle the response from backend here
            .then((res) => {
                localStorage.setItem("data", JSON.stringify(res.data));
                console.log(res.data);
                history.push("/home");
                // forceUpdate();
                window.location.reload();
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
            <h3>Login Form</h3>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={onChangeUserEmail}
                            placeholder="Enter email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={onChangeUserPassword}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            handleUpload();
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};
