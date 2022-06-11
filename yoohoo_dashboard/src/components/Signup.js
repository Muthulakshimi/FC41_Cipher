import React, { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import useForceUpdate from "use-force-update";

export const Signup = () => {
    const history = useHistory();
    const forceUpdate = useForceUpdate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUserName = (e) => {
        setName(e.target.value);
    };
    const onChangeUserEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangeUserPhone = (e) => {
        setPhone(e.target.value);
    };
    const onChangeUserPassword = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (localStorage.getItem("data")) {
            history.push("/home");
            forceUpdate();
        }
    });

    const handleUpload = () => {
        // let newfiles = this.state.newfiles;

        // let formData = new FormData();

        // // Adding files to the formdata
        // formData.append("image", newfiles);
        // formData.append("name", "Name");
        let formData = JSON.stringify({
            email: email,
            password: password,
            name: name,
            phone: phone,
        });
        console.log(formData);
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/user/signup",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            // Attaching the form data
            data: formData,
        })
            // Handle the response from backend here
            .then((res) => {
                // localStorage.setItem("data", JSON.stringify(res.data));
                console.log(res.data);
                history.push("/login");
                forceUpdate();
                return <Redirect to="/login" />;
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
            <h3>Signup Form</h3>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={onChangeUserName}
                            placeholder="User Name"
                        />
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="tel"
                            value={phone}
                            maxlength="10"
                            onChange={onChangeUserPhone}
                            placeholder="Phone"
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
