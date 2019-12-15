import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import ActionBar from './actionbar';
import LikeCounter from './likecounter';
import CommentController from './commentcontroller';

export default class Post extends Component {
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
    const url_likes = "https://tinyinstagram-259109.appspot.com/getlike";
    // we get the number of likes for this post_id
    axios.get(url_likes, {
      params:{
          id_post:this.props.postData.id,
          id_user:localStorage.getItem('idUser')
      }
    })
      .then(res => {
        this.props.postData.likes = parseInt(res.data[0]);
        console.log(res.data);
        this.props.postData.liked = parseInt(res.data[1]) === 1;
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
    let fdp = this.state.poster.id;
    console.log("fdp",fdp)
    return (

      <div className="card" id={this.props.postData.id}>
        <div className="card-top">
          <Link className="card-poster-name" id={this.state.poster.id} to={`/profile/${this.state.poster.id}`}> {this.state.poster.name}</Link>
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