import React from "react";
import { Form, Button, Modal, Card, CardGroup } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

export const Contact = () => {
    const [contacts, setContacts] = useState();
    useEffect(() => {
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/contact",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("data")).token
                }`,
            },
            data: { userId: JSON.parse(localStorage.getItem("data")).id },
        })
            // Handle the response from backend here
            .then((res) => {
                // localStorage.setItem(
                //     "location_response",
                //     JSON.stringify(res.data)
                // );
                console.log(res.data);
                setContacts(res.data);
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
    }, []);

    const [contact, setContact] = useState("");
    const [name, setName] = useState("");
    const [relation, setRelation] = useState("");

    const [email, setEmail] = useState("");

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

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
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
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("data")).token
                }`,
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

    const handleDelete = (itemId) => {
        console.log(itemId);
        const contactData = {
            _id: itemId,
        };
        axios({
            // Endpoint to send files
            url: "http://localhost:8000/api/contact/delete",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("data")).token
                }`,
            },

            // Attaching the form data
            data: contactData,
        })
            // Handle the response from backend here
            .then((res) => {
                // localStorage.setItem("access_token",res.data.access_token);
                console.log(res.data);
                window.location.reload();
            });
    };

    return (
        <div>
            <h1 align="center">Contacts Form</h1>
            <div className="text-center pb-2">
                <Button variant="primary" onClick={handleShow}>
                    Add New Contact Information
                </Button>
            </div>

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
            {/* <Container>
                <Form>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => handleUpload(e)}
                    >
                        Submit
                    </Button>
                </Form>
            </Container> */}
            <CardGroup>
                {contacts &&
                    contacts.data.map((item) => {
                        return (
                            <Card style={{ width: "15rem", margin: "10px" }}>
                                <Card.Body>
                                    <Card.Title>
                                        {item.name} ( {item.relation} )
                                    </Card.Title>
                                    <Card.Text>
                                        Phone : {item.phone} <br /> Email :{" "}
                                        {item.email}
                                    </Card.Text>
                                    <Button
                                        variant="danger"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete(item._id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
            </CardGroup>
        </div>
    );
};
