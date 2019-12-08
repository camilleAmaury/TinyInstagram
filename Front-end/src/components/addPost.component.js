import React, { Component } from "react";
import axios from 'axios';
import './addPost-stylesheet.css'

export default class addPost extends Component {
    state = {
        tag: '',
        description: '',
        image: null,
        isPosted :false
      }
    
      handleChangeTag = event => {
        this.setState({ tag: event.target.value});
      }
    
      handleChangeDescription = event => {
        this.setState({ description: event.target.value});
      }
    
      handleChangeImage = event => {
        this.setState({ image: event.target.files[0]});
      }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const URL = 'https://tinyinstagram-259109.appspot.com/addpost';
        const formData = new FormData();
        formData.append('image',this.state.image);  
        
        axios.get(PROXY_URL+URL,{
            params: {
                description: this.state.description,
                id_user: this.props.location.state.userId,
                picture : formData,
                tags: this.state.tag
              }
            })
        
          .then(res => {
            if (res.data[0] == 1) {
                console.log(res);
                this.state.isPosted = true;
                this.props.history.push({pathname : '/addPost', state :{userId : this.props.location.state.userId}} );
            }
            else {
                console.log(res);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
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
                        <a class="fa fa-user" href="#"></a>
                    </section>
                </nav>
                <div class="login">

                <h1>Créer un post</h1>

                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Tag" type="text" name="tag" onChange={this.handleChangeTag.bind(this)}/>
                        <textarea placeholder="Description" type="text" name="description" onChange={this.handleChangeDescription.bind(this)}/>

                        <button type="button" class="btn post-actions__upload attachments--btn">
                        <label for="upload-image" class="post-actions__label">
                            <i class="fa fa-image" aria-hidden="true"></i> Ajouter une photo
                        </label>
                        </button>
                        <input type="file" id="upload-image" name ="image" onChange={this.handleChangeImage.bind(this)} />

                        <input type="submit" value="Poster" />
                    </form>

                    <br/>
                    { this.state.isPosted && <div class="alert alert-success" role="alert">
                    Le post est crée avec succès
                  </div> }
                </div>
            </>
            );
        }
    
}