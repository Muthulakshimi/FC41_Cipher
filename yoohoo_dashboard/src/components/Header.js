import React, { useEffect } from "react";
import { NavbarComponent } from "./NavbarComponent";
import { useHistory } from "react-router-dom";

export const Header = () => {
    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("data")) {
            history.push("/login");
        }
    });

    return (
        <>
            <NavbarComponent />
        </>
    );
};
