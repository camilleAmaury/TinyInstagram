import React, { Component } from "react";
import axios from 'axios';

import Navbar from '../Navbar/navbar';

import './homepage-stylesheet.css';

import Post from './post';

export default class HomePage extends Component {
  state = {
    posts: []
  }

  componentDidMount() {

    const url_posts = "https://tinyinstagram-259109.appspot.com/getposts";
    axios.get(url_posts, {
      params:{
        min:-10,
        max:0
      }
    })
      .then(res => {
        let posts = [];
        for (let i = 0; i < res.data.length; i++) {
          var post = {
            likes: -1,
            id: res.data[i][0],
            date: res.data[i][1],
            poster: {
              id: res.data[i][3],
              name : res.data[i][6] + " " + res.data[i][7]
            },
            image: res.data[i][4],
            comments: [
              { user: res.data[i][5], comment: res.data[i][2] }
            ],
            liked:false
          };
          posts.push(post)

        }
        this.setState({ posts: posts });
        
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