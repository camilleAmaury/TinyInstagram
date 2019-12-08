import React, { Component } from "react";
import axios from 'axios';
import './profile-stylesheet.css'


export default class profile extends Component {
        render() {
            return (
                <>
                <nav class="navbar">
                    <section class="logo-section"><img class="logo" src="https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png" />
                        <div></div><img class="logoname" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png" /></section>

                    <section class="icons-section">
                        <a class="fa fa-home" href="/homepage"></a>
                        <a class="fa fa-plus-square-o" href="#"></a>
                        <a class="fa fa-user" href="#"></a>
                    </section>
                </nav>

            </>
            );
        }
    
}