import React, { Component } from "react";
import axios from 'axios';

export default class ActionBar extends Component {
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
    const url_likes = "https://tinyinstagram-259109.appspot.com/likepost";
    // we get the number of likes for this post_id
    // --> si false on ajoute, si true on retire --> voir requête API : this.state.liked
    axios.get(url_likes,{
      params:{
        id_post:this.props.id,
        id_user:localStorage.getItem('idUser')
      }
    })
      .then(res => {
        if(res.data[0]==="1"){
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