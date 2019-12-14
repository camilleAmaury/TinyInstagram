import React, { Component } from "react";
import axios from 'axios';

import Navbar from '../Navbar/navbar';

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
              name : res.data[i][6] + " " + res.data[i][7]
            },
            image: res.data[i][4],
            comments: [
              { user: res.data[i][5], comment: res.data[i][2] }
            ],
            liked:false
          };
          this.state.posts.push(post)

        }
        this.setState({ posts: this.state.posts });
        
      }
    );
  }
  render() {
    return (
      <>
        < Navbar/>
        {this.state.posts.map((post, i) => <Post key={i} postData={post} />)}
      </>
    );
  }
}