
import React, { Component } from "react";
import {Link} from "react-router-dom";
import axios from 'axios';

export default class LikeCounter extends React.Component {
    render() {
        return (
            <div className="card-views">
                <div className="card-view-count">{this.props.likes} likes</div>
            </div>
        );
    }
}