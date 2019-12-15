
import React, { Component } from "react";
export default class LikeCounter extends Component {
    render() {
        return (
            <div className="card-views">
                <div className="card-view-count">{this.props.likes} likes</div>
            </div>
        );
    }
}