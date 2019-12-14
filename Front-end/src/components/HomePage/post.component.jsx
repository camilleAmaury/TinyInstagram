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
      comments: [],
      liked:false
    }
  }

  componentDidMount = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url_likes = "https://tinyinstagram-259109.appspot.com/getlike?id_post=";
    const url_like2 = "&id_user="
    // we get the number of likes for this post_id
    axios.get(proxyurl + url_likes + this.props.postData.id + url_like2 + localStorage.getItem('idUser'))
      .then(res => {
        let data = this.props.postData;
        this.props.postData.likes = parseInt(res.data[0]);
        console.log(res.data[1]);
        this.props.postData.liked = parseInt(res.data[1]) == 1;
        this.setState({ ...this.props.postData });
      });
  }

  likeButton = (liked) => {
    if (liked) {
      this.setState({ likes: this.state.likes + 1, liked:liked });
    } else {
      this.setState({ likes: this.state.likes - 1, liked:liked });
    }
  }

  render() {
    const data = this.state.image;
    return (

      <div className="card" id={this.props.postData.id}>
        <div className="card-top">
          <a className="card-poster-name" id={this.props.postData.id}>{this.props.postData.name}</a>
        </div>
        <div className="card-image-container">
          <img src={this.props.postData.image}></img>
        </div>
        <div className="card-middle">
          <ActionBar like={this.likeButton} id={this.props.postData.id} liked={this.state.liked} />
          <LikeCounter likes={this.state.likes} />
          <CommentController comments={this.props.postData.comments} />
        </div>

      </div>

    );
  }
}