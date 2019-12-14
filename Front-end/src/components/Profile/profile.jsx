import React, { Component } from "react";
import axios from 'axios';

import Navbar from '../Navbar/navbar';

import './profile-stylesheet.css'


export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            follower:[],
            followed:[],
            strangers:[],
            posts:[]
        }
    }

    componentDidMount = () => {
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const url_profile = "https://tinyinstagram-259109.appspot.com/getprofile?id_user=";
        // // we get the number of likes for this post_id
        // axios.get(proxyurl + url_profile + localStorage.getItem('idUser'))
        //   .then(res => {
        //     let data = this.props.postData;
        //     this.props.postData.likes = parseInt(res.data[0]);
        //     console.log(res.data[1]);
        //     this.props.postData.liked = parseInt(res.data[1]) == 1;
        //     this.setState({ ...this.props.postData });
        //   });
      }


    render() {
        return (
            <>
                < Navbar/>
                <header>
                    <div class="container">
                        <div class="profile">
                            <div class="profile-image">
                                <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="" />
                            </div>
                            <div class="profile-user-settings">
                                <h1 class="profile-user-name">janedoe_</h1>
                                <button class="btn profile-edit-btn">Edit Profile</button>
                                <button class="btn profile-settings-btn" aria-label="profile settings"><i class="fas fa-cog" aria-hidden="true"></i></button>
                            </div>
                            <div class="profile-stats">
                                <ul>
                                    <li><span class="profile-stat-count">164</span> posts</li>
                                    <li><span class="profile-stat-count">188</span> followers</li>
                                    <li><span class="profile-stat-count">206</span> following</li>
                                </ul>
                            </div>
                            <div class="profile-bio">
                                <p><span class="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️</p>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div class="container">
                        <div class="gallery">
                            <div class="gallery-item" tabIndex="0">
                                <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" class="gallery-image" alt="" />
                                <div class="gallery-item-info">
                                    <ul>
                                        <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 56</li>
                                        <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="gallery-item" tabIndex="0">
                                <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" class="gallery-image" alt="" />
                                <div class="gallery-item-info">
                                    <ul>
                                        <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 56</li>
                                        <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="gallery-item" tabIndex="0">
                                <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" class="gallery-image" alt="" />
                                <div class="gallery-item-info">
                                    <ul>
                                        <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> 56</li>
                                        <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="fas fa-comment" aria-hidden="true"></i> 2</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }

}