import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router';

import Navbar from '../Navbar/navbar';

import './addPost-stylesheet.css';

export default class AddPost extends Component {
  state = {
    tag: '',
    description: '',
    image: null,
    imagebase64: '',
    imagePreviewUrl: '',
    redirect_homepage: false
  }

  handleChangeTag = event => {
    this.setState({ tag: event.target.value });
  }

  handleChangeDescription = event => {
    this.setState({ description: event.target.value });
  }

  handleChangeImage = event => {

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result,
        imagebase64: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  handleSubmit = event => {

      event.preventDefault();

      const data = new FormData()
      data.append('file', this.state.image)

    // Upload de l'image dans public/uploads utilise Node.js server proxy 
    // pour démarrer le server (npm run server)
    // Il faut remplacer localhost par <tinyinstagram-259109.appspot.com> lors du deploiement.
    axios.post("http://localhost:8000/upload", data, { 
        
    })
    .then(res => { 
      const urlapi = 'https://tinyinstagram-259109.appspot.com/addpost';

      axios.get(urlapi, {
        params: {
          description: this.state.description,
          id_user: localStorage.getItem('idUser'),
          picture: '/uploads/'+res.data.filename,
          tags: this.state.tag
        }
      })

        .then(res => {
          if (res.data[0] == 1) {
            this.setState({redirect_homepage:true});
          }
          else {
            console.log(res);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  })
  }
  render() {
    const imgSize = {

      height: '250px',
      width: '350px',
      "border-radius": '1.5em'

    };
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} style={imgSize} />);
    }
    return (
      <>
        <div className="App">
          < Navbar />
          <div class="login">

            <h1>Créer un post</h1>

            <form onSubmit={this.handleSubmit}>
              <input placeholder="Tag" type="text" name="tag" onChange={this.handleChangeTag.bind(this)} />
              <textarea placeholder="Description" type="text" name="description" onChange={this.handleChangeDescription.bind(this)} />

              <button type="button" class="btn post-actions__upload attachments--btn">
                <label for="upload-image" class="post-actions__label">
                  <i class="fa fa-image" aria-hidden="true"></i> Ajouter une photo
                </label>
              </button>
              <div class="btn post-actions__upload">
                {$imagePreview}
              </div>

              <br />
              <br />
              <input type="file" id="upload-image" name="image" onChange={this.handleChangeImage} />

              <input type="submit" value="Poster" />
            </form>

          </div>
          {this.state.redirect_homepage ? <Redirect to='/homepage' /> : ''}
        </div>
      </>
    );
  }

}