import React, { Component } from "react";
import { Link } from "react-router-dom";

import './navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar">
          <section className="logo-section"><img className="logo" src="https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png" />
            <div></div><img className="logoname" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png" /></section>

          <section className="icons-section">
            <a className="fa fa-home"><Link to={`/homepage`}></Link></a>
            <a className="fa fa-plus-square-o"><Link to={`/addpost`}></Link></a>
            <a className="fa fa-user"><Link to={`/profile`}></Link></a>
          </section>
        </nav>
      </>
    );
  }
}