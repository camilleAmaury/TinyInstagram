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
            posts: [],
            prenom: "",
            nom: ""
        }
    }

    componentDidMount = () => {

        const url_profile = "https://tinyinstagram-259109.appspot.com/getprofile";
        // we get the number of likes for this post_id
        axios.get(url_profile, {
            params: {
                id_user: this.props.match.params.user
            }
        }).then(res => {
            function indexId(elem){
                return elem === localStorage.getItem("idUser");
            }
            
            let isFollowed = res.data[0].findIndex(indexId) !== -1;
            console.log(isFollowed)
            for(let i = 0; i < res.data[5].length; i++){
                res.data[5][i].push(res.data[1][0]);
            }
            for(let i = 0; i < res.data[6].length; i++){
                res.data[6][i].push(res.data[2][0]);
            }
            this.setState(
                {
                    id: this.props.match.params.user,
                    isfollowed: isFollowed,
                    followers: res.data[5],
                    followings: res.data[6],
                    posts: res.data[2],
                    nom: res.data[3],
                    prenom: res.data[4]
            });
        });
    }

    handleFollow = (idUser, alreadyfollow) => {
        const url_follow = "https://tinyinstagram-259109.appspot.com/follow";
        // we get the number of likes for this post_id
        axios.get(url_follow,
            {
                params: {
                    id1: localStorage.getItem('idUser'),
                    id2: idUser
                }
            }
        ).then(res => {
            if (res.data[0] === "1") {
                let followers = this.state.followers;
                if(alreadyfollow){
                    function indexId(elem){
                        return elem[2] !== localStorage.getItem("idUser");
                    }
                    followers = followers.filter(indexId);
                }else{
                    followers.push([localStorage.getItem('nomUser'), localStorage.getItem('prenomUser'), localStorage.getItem('idUser')]);
                }
                this.setState({ isfollowed: !alreadyfollow, followers:followers });
            } else {
                console.log("ça ne marche pas");
            }
        });
    }


    render() {
        return (
            <>
                < Navbar />
                <header>
                    <div className="container">
                        <div className="profile">
                            <div className="profile-image">
                                <img src="https://i.ytimg.com/vi/rWCTeCnTfyE/hqdefault.jpg" alt="" />
                            </div>
                            <div className="profile-user-settings">
                                <h1 className="profile-user-name">{this.state.prenom + " " + this.state.nom}</h1>
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
                                <p><span className="profile-real-name">{}</span>Description vide</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <span>Followers : </span>
                    <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
                        {this.state.followers.map((user, i) => < Userbar key={i} user={user} />)}
                    </div>
                </div>
                <div className="container">
                    <span>Followings : </span>
                    <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
                        {this.state.followings.map((user, i) => < Userbar key={i} user={user} />)}
                    </div>
                </div>

                <main>
                    <div className="container">
                        <div className="gallery">
                            {this.state.posts.map((post, i) => < ProfileInformation key={i} post={post} />)}
                        </div>
                    </div>
                </main>
            </>
        );

        function buttonProfile(userid, isfollowed, fonction) {
            if (userid === localStorage.getItem('idUser')) {
                return (
                    <div>
                        <button className="btn profile-edit-btn">Edit Profile</button>
                        <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fa fa-cog" aria-hidden="true"></i></button>
                    </div>
                );
            } else {
                return (
                    <button className="btn profile-edit-btn" onClick={() => fonction(userid, isfollowed)}>{isfollowed ? "Se désabonner" : "S'abonner"}</button>
                );
            }
        }
    }
}