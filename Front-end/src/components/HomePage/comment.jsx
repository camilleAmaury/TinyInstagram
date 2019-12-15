import React, { Component } from "react";

export default class Comment extends Component {
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