import React from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { NavbarComponent } from "./NavbarComponent";

export const Contact = () => {
    const [contact, setContact] = useState("");
    const [name, setName] = useState("");
    const [relation, setRelation] = useState("");
    const [contact2, setContact2] = useState("");
    const [contact3, setContact3] = useState("");

    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [email3, setEmail3] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeContact = (e) => {
        setContact(e.target.value);
    };
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangeRelation = (e) => {
        setRelation(e.target.value);
    };

    const onChangeContact2 = (e) => {
        setContact2(e.target.value);
    };
    const onChangeContact3 = (e) => {
        setContact3(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangeEmail2 = (e) => {
        setEmail2(e.target.value);
    };
    const onChangeEmail3 = (e) => {
        setEmail3(e.target.value);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        // let newfiles = this.state.newfiles;

        // let formData = new FormData();

        // // Adding files to the formdata
        // formData.append("image", newfiles);
        // formData.append("name", "Name");
        let formData = JSON.stringify({
            userId: JSON.parse(localStorage.getItem("data")).id,
            phones: [contact2, contact3],
            emails: [email2, email3],
        });
        console.log(formData);
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/contact/update",
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

    const handleSubmit = () => {
        const contactData = {
            userId: JSON.parse(localStorage.getItem("data")).id,
            phone: contact,
            email: email,
            relation: relation,
            name: name,
        };
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/contact/update",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            // Attaching the form data
            data: contactData,
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
            <NavbarComponent />
            <h3>Contacts Form</h3>

            <Button variant="primary" onClick={handleShow}>
                Add Contact Information
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicContact1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={onChangeName}
                            placeholder="Enter Name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicContact1">
                        <Form.Label>Relation</Form.Label>
                        <Form.Control
                            type="text"
                            value={relation}
                            onChange={onChangeRelation}
                            placeholder="Enter Relation."
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicContact1">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="tel"
                            maxlength="10"
                            value={contact}
                            onChange={onChangeContact}
                            placeholder="Enter Contact"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={onChangeEmail}
                            placeholder="Enter Email"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicContact2"
                            >
                                <Form.Label>Contact 2</Form.Label>
                                <Form.Control
                                    type="tel"
                                    maxlength="10"
                                    value={contact2}
                                    onChange={onChangeContact2}
                                    placeholder="Enter Contact 2"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email 2</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email2}
                                    onChange={onChangeEmail2}
                                    placeholder="Enter Email 2"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicContact3"
                            >
                                <Form.Label>Contact 3</Form.Label>
                                <Form.Control
                                    type="tel"
                                    maxlength="10"
                                    value={contact3}
                                    onChange={onChangeContact3}
                                    placeholder="Enter Contact 3"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email 3</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email3}
                                    onChange={onChangeEmail3}
                                    placeholder="Enter Email 3"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

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
