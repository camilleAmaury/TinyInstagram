import React, { Component } from "react";
import axios from 'axios';


export default class ProfileInformation extends Component {
    constructor() {
        super();
        this.state = {
            likes:0
        }
    }
    componentDidMount = () => {

        const url_profile = "https://tinyinstagram-259109.appspot.com/getlike";
        // we get the number of likes for this post_id
        axios.get(url_profile, {
            params: {
                id_post: this.props.post[0]
            }
        }).then(res => {
            this.setState({likes:res.data[0]});
        });
    }

    render = () => {
        return (
            <div className="gallery-item" tabIndex="0">
                <img src={this.props.post[0]} className="gallery-image" alt="" />
                {/* src={this.props.post.image} */}
                <div className="gallery-item-info">
                    <ul>
                        <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fa fa-heart" aria-hidden="true"></i> {this.state.likes}</li>
                    </ul>
                </div>
            </div>
        );
    }
}