import React, { Component } from "react";
import axios from 'axios';

import Navbar from '../Navbar/navbar';
import Userbar from '../Userbar/userbar'
import ProfileInformation from './profile_information';

import './profile-stylesheet.css'


export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            isfollowed: false,
            followers: [],
            followings: [],
            strangers: [],
            posts: [],
            prenom: "",
            nom: "",
            username: ""
        }
    }

    componentDidMount = () => {
        // test
        this.setState(
            {
                id: this.props.match.params.user,
                isfollowed: false,
                followers: [
                    { "id": 5637476211228672, "username": "kikoojapos" },
                    { "id": 5642368648740864, "username": "mario" },
                ],
                followings: [
                    { "id": 5667525748588544, "username": "luigi" },
                ],
                strangers: [
                    { "id": 5667525748588544, "username": "luigi" },
                    { "id": 5744149642870784, "username": "Juge-kun" }
                ],
                posts: [
                    {
                        "image": "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop",
                        likes: 10,
                        comments: 5
                    },
                    {
                        "image": "https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop",
                        likes: 1050,
                        comments: 3
                    },
                    {
                        "image": "https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop",
                        likes: 1,
                        comments: 1000
                    }
                ],
                username: "tonclure2000",
                nom: "Jean",
                prenom: "Bonbeur"
            }
        );

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

    handleFollow = (idUser, alreadyfollow) => {
        // test
        let strangers = this.state.strangers;
        let followers = this.state.followers;
        function findIndexById(elem){
            return elem.id == localStorage.getItem("idUser");
        }
        if(alreadyfollow){
            let new_follower = followers.findIndex(findIndexById);
            strangers.push(followers[new_follower]);
            followers.splice(new_follower);
            this.setState({ strangers: strangers, followers: followers, isfollowed: false });
        }else{
            let new_follower = strangers.findIndex(findIndexById);
            followers.push(strangers[new_follower]);
            strangers.splice(new_follower);
            this.setState({ strangers: strangers, followers: followers, isfollowed: true });
        }
        
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const url_follow = "https://tinyinstagram-259109.appspot.com/follow";
        // // we get the number of likes for this post_id
        // axios.get(proxyurl + url_follow,
        //     {
        //         params: {
        //             id1: localStorage.getItem('idUser'),
        //             id2: idUser
        //         }
        //     }
        // ).then(res => {
        //     console.log(res.data);
        //     if (res.data[0] == 1) {
        //         let strangers = this.state.strangers;
        //         let followers = this.state.followers;
        //         let new_follower = strangers.findIndex(value => value.id === localStorage.getItem('idUser'));
        //         followers.push(this.state.strangers[new_follower]);
        //         strangers.splice(new_follower);
        //         this.setState({ strangers: strangers, followers: followers, isfollowed:true });
        //     }
        // });
    }


    render() {
        return (
            <>
                < Navbar />
                <header>
                    <div className="container">
                        <div className="profile">
                            <div className="profile-image">
                                <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="" />
                            </div>
                            <div className="profile-user-settings">
                                <h1 className="profile-user-name">{this.state.username}</h1>
                                {buttonProfile(this.state.id, this.state.isfollowed, this.handleFollow)}

                            </div>
                            <div className="profile-stats">
                                <ul>
                                    <li><span className="profile-stat-count">{this.state.posts.length}</span> posts</li>
                                    <li><span className="profile-stat-count">{this.state.followers.length}</span> followers</li>
                                    <li><span className="profile-stat-count">{this.state.followings.length}</span> following</li>
                                </ul>
                            </div>
                            <div className="profile-bio">
                                <p><span className="profile-real-name">{this.state.prenom + " " + this.state.nom + " : "}</span>Tonclure du 92, toi même tu sais</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <span>Followers : </span>
                    <div>
                        {this.state.followers.map((user, i) => < Userbar key={i} user={user} />)}
                    </div>
                </div>
                <div className="container">
                    <span>Followings : </span>
                    <div>
                        {this.state.followings.map((user, i) => < Userbar key={i} user={user} />)}
                    </div>
                </div>

                {this.state.id === localStorage.getItem('idUser') ?
                    <div className="container">
                        <span>Other Users : </span>
                        <div>
                            {this.state.strangers.map((user, i) => < Userbar key={i} user={user} />)}
                        </div>
                    </div>
                    :
                    ''
                }

                <main>
                    <div className="container">
                        <div className="gallery">
                            {this.state.posts.map((post, i) => < ProfileInformation key={i} post={post} />)}
                        </div>
                    </div>
                </main>
            </>
        );

        function buttonProfile(userid, isfollowed, fonction, fonction2) {
            if (userid === localStorage.getItem('idUser')) {
                return (
                    <div>
                        <button className="btn profile-edit-btn">Edit Profile</button>
                        <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fa fa-cog" aria-hidden="true"></i></button>
                    </div>
                );
            } else {
                return (
                    <a className="btn profile-edit-btn" onClick={() => fonction(userid, isfollowed)}>{isfollowed ? "Se désabonner" : "S'abonner"}</a>
                );
            }
        }
    }

}