import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import './homepage-stylesheet.css';

import Post from './post.component';

export default class HomePage extends Component {
  state = {
    posts: []
  }

  componentDidMount() {

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url_posts = "https://tinyinstagram-259109.appspot.com/getposts?min=-1&max=2";
    axios.get(proxyurl + url_posts)
      .then(res => {
        console.log(res.data);

        for (let i = 0; i < res.data.length; i++) {

          var post = {
            likes: -1,
            id: res.data[i][0].replace("post(", "").replace(")", ""),
            date: res.data[i][1],
            poster: {
              id: res.data[i][3].replace("user(", "").replace(")", ""),
              name: "Jean" + " " + "Claude" //à remplacer en temps voulu par --> 'name : res.data[i][6] + " " + res.data[i][7]'
            },
            image: res.data[i][4],
            comments: [
              { user: res.data[i][2], comment: res.data[i][5] }
            ]
          };
          this.state.posts.push(post)

        }
        this.setState({ posts: this.state.posts });
        
      }
    );
  }

  createFil = () => {

    let filActualite = [];
    for (let i = 0; i < this.state.posts.length; i++) {

      filActualite.push(<Post postData={this.state.posts[i]} />)
      filActualite.push(<br />)

    }

    return filActualite;
  }
  render() {
    return (
      <>
        <nav className="navbar">
          <section className="logo-section"><img className="logo" src="https://seeklogo.com/images/I/instagram-new-2016-glyph-logo-84CB825424-seeklogo.com.png" />
            <div></div><img className="logoname" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2000px-Instagram_logo.svg.png" /></section>

          <section className="icons-section">
            <a className="fa fa-home" href="/homepage"></a>
            <a className="fa fa-plus-square-o" href="/addPost"></a>
            <a className="fa fa-user" href="/profile"></a>
          </section>
        </nav>
        {this.createFil()}
      </>
    );
  }
}