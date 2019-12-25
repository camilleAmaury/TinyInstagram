import React, { Component } from "react";

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
            <a href={`/profile/${this.props.user[2]}`}>
                <div className="story-bar__user" id={this.props.user[2]}>
                    <div className="story-bar__user-avatar" style={{background:"gray"}}></div>
                    <div className="story-bar__user-name">{this.props.user[1] + " " + this.props.user[0]}</div>
                </div>
            </a>
        );
    }
}