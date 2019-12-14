import React, { Component } from "react";


export default class ProfileInformation extends Component {
    render = () => {
        return (
            <div className="gallery-item" tabIndex="0">
                <img src={this.props.post.image} className="gallery-image" alt="" />
                {/* src={this.props.post.image} */}
                <div className="gallery-item-info">
                    <ul>
                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fa fa-heart" aria-hidden="true"></i> {this.props.post.likes}</li>
                        <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fa fa-comment" aria-hidden="true"></i>  {this.props.post.comments}</li>
                    </ul>
                </div>
            </div>
        );
    }
}