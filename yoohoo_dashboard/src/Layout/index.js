import React from "react";
import { Container } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Container>{children}</Container>
            <Footer />
        </>
    );
};

export default Layout;
