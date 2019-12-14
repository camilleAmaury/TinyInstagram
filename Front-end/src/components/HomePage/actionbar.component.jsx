import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default class ActionBar extends React.Component {
  constructor() {
    super();
    this.state = {
      marked: false
    }
  }

  componentDidMount = () =>{
      this.setState({liked:this.props.liked})
  }

  toggleLike = () => {
    // query the server to post the like
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url_likes = "https://tinyinstagram-259109.appspot.com/likepost?id_post=";
    const url_like2 = "&id_user=";
    // we get the number of likes for this post_id
    // --> si false on ajoute, si true on retire --> voir requête API : this.state.liked
    axios.get(proxyurl + url_likes + this.props.id + url_like2 + localStorage.getItem('idUser'))
      .then(res => {
        console.log(res.data)
        if(res.data[0]==1){
          let liked = !this.props.liked;
          this.props.like(liked);
        }else{
          // ne se passe rien car le serveur n'a pas répondu correctement
        }
      });
  }

  markPost = () => {
    let self = this;
    this.setState({ marked: !self.state.marked });
  }

  startComment = () => {
    document.querySelector().focus();
  }

  render() {
    return (
      <div className="card-action-bar">
        <a onClick={this.toggleLike}><i className={this.props.liked ? "fa fa-heart" : "fa fa-heart-o"} /></a>
      </div>
    )
  }
}