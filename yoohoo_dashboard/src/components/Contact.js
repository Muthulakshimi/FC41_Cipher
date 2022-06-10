import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

export const Contact = () => {
    const [contact1, setContact1] = useState("");
    const [contact2, setContact2] = useState("");
    const [contact3, setContact3] = useState("");

    const onChangeContact1 = (e) => {
        setContact1(e.target.value);
    };
    const onChangeContact2 = (e) => {
        setContact2(e.target.value);
    };
    const onChangeContact3 = (e) => {
        setContact3(e.target.value);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        // let newfiles = this.state.newfiles;

        // let formData = new FormData();

        // // Adding files to the formdata
        // formData.append("image", newfiles);
        // formData.append("name", "Name");
        let formData = JSON.stringify({
            contact1: contact1,
            contact2: contact2,
            contact3: contact3,
        });
        console.log(formData);
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/user/contacts",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            // Attaching the form data
            data: formData,
        })
            // Handle the response from backend here
            .then((res) => {
                // localStorage.setItem("access_token",res.data.access_token);
                console.log(res.data);
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
                    <Form.Group className="mb-3" controlId="formBasicContact1">
                        <Form.Label>Contact 1</Form.Label>
                        <Form.Control
                            type="tel"
                            maxlength="10"
                            value={contact1}
                            onChange={onChangeContact1}
                            placeholder="Enter Contact 1"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContact2">
                        <Form.Label>Contact 2</Form.Label>
                        <Form.Control
                            type="tel"
                            maxlength="10"
                            value={contact2}
                            onChange={onChangeContact2}
                            placeholder="Enter Contact 2"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContact3">
                        <Form.Label>Contact 3</Form.Label>
                        <Form.Control
                            type="tel"
                            maxlength="10"
                            value={contact3}
                            onChange={onChangeContact3}
                            placeholder="Enter Contact 3"
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
