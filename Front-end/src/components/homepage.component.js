import React, { Component } from "react";
import axios from 'axios';
import './homepage-stylesheet.css'
import {Link} from "react-router-dom";

class ActionBar extends React.Component {
    constructor(){
      super();
      this.state = {
        liked: false,
        marked: false
      }
    }
  
    toggleLike = () => {
      let self = this;
      this.props.like(!self.state.liked);
      this.setState({liked: !self.state.liked});
    }
    
    markPost = () => {
      let self = this;
      this.setState({marked: !self.state.marked});
    }
    
    startComment = () => {
      document.querySelector().focus(); 
    }
    
    render(){
      return (
        <div className="card-action-bar">
          <a onClick={this.toggleLike}><i className={ this.state.liked ? "fa fa-heart" : "fa fa-heart-o" }/></a>
        </div>
      )
    }
  }
  
  class LikeCounter extends React.Component {
    render(){
      return (
        <div className="card-views">
          <div className="card-view-count">{this.props.likes} likes</div>
        </div>
      );
    }
  }
  
  class Comment extends React.Component {
    render(){
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
  
  class CommentBox extends React.Component {
    constructor(){
      super();
      this.state = {
        user: "codepen.person",
        comment: null
      }
    }
    
    updateComment(e) {
      this.setState({[e.target.name] : e.target.value});
    }
    
    submitComment = () => {
      let comment = {...this.state};
      if(comment.comment !== null || comment.comment === ""){
        this.props.submit(comment);
        this.setState({comment: ""});
      }
    }
    
    render() {
      let buttonClass = this.state.comment === null ||  this.state.comment === ""?  "" : "postable";
      return (
        <>
          <input name="comment" placeholder="Add a comment..." value={this.state.comment} default="comment" onChange={ e => { this.updateComment(e) }}/>
          <button className={buttonClass} onClick={this.submitComment}>Post</button>
        </>
      );
    }
  }
  
  class CommentController extends React.Component {
    render() {
      return (
        <>
          <div className="poster-comment"></div>
          <div className="post-comments">
            {this.props.comments.map( (comment) => <Comment user={comment.user} comment={comment.comment} />)}
          </div>
        </>
      ); 
    }
  }

class Post extends React.Component {
    constructor(){
        super();
        this.state = {
            likes: 100,
            poster: {
              name: "",
              profile_picture: ""
            },
            image: "",
            comments: []
          }
      }
      
      componentDidMount() {
        this.setState({...this.props.postData});
      }
      
      likeButton = (liked) => {
        if (liked) {
          this.setState({likes: this.state.likes + 1});
        } else {
          this.setState({likes: this.state.likes - 1});
        }
      }
      
      updateComments = (data) => {
        console.log("updating comments"); 
        let state = this.state;
        console.log(data);
        this.setState({comments: [data, ...state.comments]});
      }
    render() {
        return (
            
            <div className="card">
            <div className="card-top">
              <a className="card-poster-image-container">
                <img className="user-pfp" src={this.state.poster.profile_picture}/>
              </a>
              <a className="card-poster-name">{this.state.poster.name}</a>
            </div>
            <div className="card-image-container">
              <img src={this.state.image}></img>
            </div>
            <div className="card-middle">
              <ActionBar like={this.likeButton}/>
              <LikeCounter likes={this.state.likes} />
            </div>
          </div>

        );
    }
}

export default class homepage extends Component {
    state = {
        posts: [
          {
            likes: 100,
            poster: {
              name: "taha",
              profile_picture: "https://placeimg.com/100/100/animals"
            },
            image: "https://yourmusiconline.it/uploads/products/images/f/ff09ab6498febd976409702901e881d78d510974_m.jpg",
            comments: [
              { user: "comment_dude", comment: "This is a good pic!" },
              { user: "bruh.guy", comment: "Bruh, what is this picture?" }
            ]
          },
          {
            likes: 2,
            poster: {
              name: "marwa",
              profile_picture: "https://placeimg.com/100/100/animals"
            },
            image: "https://placeimg.com/650/650/animals/sepia?t=1564211187934",
            comments: [
              { user: "comment_dude", comment: "This is a good pic!" },
              { user: "bruh.guy", comment: "Bruh, what is this picture?" }
            ]
          }
        ]
      }
          componentDidMount() {
            this.setState({...this.props.postData});
          }
          
          likeButton = (liked) => {
            if (liked) {
              this.setState({likes: this.state.likes + 1});
            } else {
              this.setState({likes: this.state.likes - 1});
            }
          }
          
          updateComments = (data) => {
            console.log("updating comments"); 
            let state = this.state;
            console.log(data);
            this.setState({comments: [data, ...state.comments]});
          }
        render() {
            return (
                <>
                <nav class="navbar">
                    <section class="logo-section"><img class="logo" src="https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png" />
                        <div></div><img class="logoname" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png" /></section>

                    <section class="icons-section">
                        <a class="fa fa-home" href="/homepage"></a>
                        <a class="fa fa-plus-square-o" href="#"></a>
                        <a class="fa fa-user" href="/profile"></a>
                    </section>
                </nav>
                <Post postData={this.state.posts[0]}/>
                <br/>
                <Post postData={this.state.posts[1]}/>
                                <br/>
                <Post postData={this.state.posts[0]}/>
                <br/>
                <Post postData={this.state.posts[0]}/>
                </>
            );
        }
    
}