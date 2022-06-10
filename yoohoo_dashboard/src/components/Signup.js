import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUserEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangeUserPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        // let newfiles = this.state.newfiles;

        // let formData = new FormData();

        // // Adding files to the formdata
        // formData.append("image", newfiles);
        // formData.append("name", "Name");
        let formData = JSON.stringify({ email: email, password: password });
        console.log(formData);
        // axios({
        //     // Endpoint to send files
        //     url: "http://localhost:8080/files",
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         // Add any auth token here
        //         // authorization: "your token comes here",
        //     },

        //     // Attaching the form data
        //     data: formData,
        // })
        //     // Handle the response from backend here
        //     .then((res) => {
        //         // localStorage.setItem("access_token",res.)
        //         console.log(res.data);
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
            <h3>Signup Form</h3>
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
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
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
                        onClick={(e) => handleUpload(e)}
                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};
