import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import ActionBar from './actionbar.component';
import LikeCounter from './likecounter.component';
import CommentController from './commentcontroller.component';

export default class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      likes: -1,
      id: -1,
      date: "",
      poster: {
        id: -1,
        name: ""
      },
      image: "",
      comments: []
    }
  }

  componentDidMount = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url_likes = "https://tinyinstagram-259109.appspot.com/getlike?id_post=";
    // we get the number of likes for this post_id
    axios.get(proxyurl + url_likes + this.props.postData.id)
      .then(res => {
        let data = this.props.postData;
        this.props.postData.likes = parseInt(res.data[0]);
        this.setState({ ...this.props.postData });
      });
  }

  likeButton = (liked) => {
    if (liked) {
      this.setState({ likes: this.state.likes + 1 });
    } else {
      this.setState({ likes: this.state.likes - 1 });
    }
  }

  render() {
    const data = this.state.image;
    return (

      <div className="card" id={this.state.id}>
        <div className="card-top">
          <a className="card-poster-name" id={this.state.poster.id}>{this.state.poster.name}</a>
        </div>
        <div className="card-image-container">
          <img src={this.state.image}></img>
        </div>
        <div className="card-middle">
          <ActionBar like={this.likeButton} id={this.state.id} />
          <LikeCounter likes={this.state.likes} />
          <CommentController comments={this.state.comments} />
        </div>

      </div>

    );
  }
}