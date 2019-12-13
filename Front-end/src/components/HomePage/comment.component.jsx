import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Comment extends React.Component {
    render() {
        return (
            <>
                <div className="comment">
                    <a className="user">{this.props.user}</a>
                    {this.props.comment}
                    <div className="timestamp">{this.props.timestamp}</div>
                </div>
            </>
        );
    }
}