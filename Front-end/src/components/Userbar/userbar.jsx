import React, { Component } from "react";
import { Link } from "react-router-dom";

import './userbar.css'

export default class Userbar extends Component {
    constructor() {
        super();
        this.state = {
            redirect_profile:false
        }
    }
    componentDidMount = () => {
    }
    
    render = () => {
        return (
           
            <a href={`/profile/${this.props.user.id}`}>
                <div className="story-bar__user" id={this.props.user.id}>
                    <div className="story-bar__user-avatar" style={{background:"gray"}}></div>
                    <div className="story-bar__user-name">{this.props.user.username}</div>
                </div>
            </a>
        );
    }
}