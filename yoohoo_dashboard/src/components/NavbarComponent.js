import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useForceUpdate from "use-force-update";

export const NavbarComponent = () => {
    const history = useHistory();
    const forceUpdate = useForceUpdate();

    const handleLogout = () => {
        localStorage.removeItem("data");
        history.push("/login");
        // forceUpdate();
        window.location.reload();
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">YOOHOO</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/contacts">Contacts</Nav.Link>
                        <Nav.Link
                            href="/logout"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                            }}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};
