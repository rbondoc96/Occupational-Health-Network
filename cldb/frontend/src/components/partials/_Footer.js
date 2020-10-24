import React from "react"
import {Link} from "react-router-dom"

import "../../styles/partials.scss" 

export default function Footer() {

    return( 
        <div className="footer-container">
            <footer className="footer">
                <div className="footer-link">
                    <a href="mailto:rbondoc96@gmail.com">Contact</a>
                </div>
                <div className="footer-link">
                    <Link to="/terms" children={"Terms & Conditions"}/>
                </div>
                <div className="footer-text">
                    Application created by BNDC Technologies
                </div>
                <div className="footer-text">
                    Copyright Rodrigo Bondoc &copy; 2020
                </div>
                <div className="footer-text">
                    Find the application code on <a href="https://github.com/rbondoc96/Occupational-Health-Network" target="_blank" >GitHub</a>
                </div>
            </footer>
        </div>
    )
}