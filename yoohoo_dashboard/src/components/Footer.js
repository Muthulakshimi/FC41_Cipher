import React from "react";
import "../App.css";

export const Footer = () => {
    let d = new Date();
    let currentYear = d.getFullYear();
    return (
        <div align="center" className="py-4 footer-div">
            <footer>
                <small>Copyright &copy; {currentYear} YOOHOO</small>
            </footer>
        </div>
    );
};
