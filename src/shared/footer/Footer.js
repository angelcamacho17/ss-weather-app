import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    
    render() {
        return (
        <footer>
            <span>by </span>
            <span className="resume-link"> 
                <a href="https://angelcamacho17.github.io/resume/" target="_blank">
                <span className="name">
                Angel Camacho
                </span>
                </a>
            </span> - <span>Software Developer</span>
        </footer>
        ) 
    }

}

export default Footer;