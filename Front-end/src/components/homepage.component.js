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
              name: ""
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

    render() {
      const data =this.state.image;
        return (
            
      <div className="card">
        <div className="card-top">
          <a className="card-poster-name">{this.state.poster.name}</a>
        </div>
        <div className="card-image-container">
          <img src={this.state.image}></img>
        </div>
        <div className="card-middle">
          <ActionBar like={this.likeButton}/>
          <LikeCounter likes={this.state.likes} />
          <CommentController comments={this.state.comments}/>
        </div>

      </div>

        );
    }
    
}

export default class homepage extends Component {

  
    state = {
        posts: [ ]
      }
        
      componentDidMount(){
        
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url ="https://tinyinstagram-259109.appspot.com/getposts?min=-1&max=2";
        axios.get(proxyurl+url)
            .then(res => {
                    console.log(res.data.length);

                    for (let i = 0; i < res.data.length; i++) {
                            
                            var post = {
                              likes: 0,
                              poster: {
                                name: res.data[i][3]
                              },
                              image: res.data[i][4],
                              comments: [
                                { user: res.data[i][2], comment: res.data[i][5]}
                              ]
                            };
                            this.state.posts.push(post)
                            
                     }
                     this.setState({posts: this.state.posts});
              })           
          }    
        
          createFil = () => {
        
              let filActualite = [];
              for (let i = 0; i < this.state.posts.length; i++) {
                  
                filActualite.push(<Post postData={this.state.posts[i]}/>)
                filActualite.push(<br/>)
                
              }
              
            return filActualite;
        }
        render() {
            return (
                <>
                <nav class="navbar">
                    <section class="logo-section"><img class="logo" src="https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png" />
                        <div></div><img class="logoname" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png" /></section>

                    <section class="icons-section">
                        <a class="fa fa-home" href="/homepage"></a>
                        <a class="fa fa-plus-square-o" href="/addPost"></a>
                        <a class="fa fa-user" href="/profile"></a>
                    </section>
                </nav>
                {this.createFil()}
                </>
            );
        }
    
}