import React, { Component } from "react";
import axios from 'axios';
import './addPost-stylesheet.css'

function base64ToBlob(x) {
  var dataURI = x;
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  var bb = new Blob([ab]);
  return bb;
}

export default class addPost extends Component {
    state = {
        tag: '',
        description: '',
        image: null,
        imagebase64 :'',
        imagePreviewUrl:''
      }
    
      handleChangeTag = event => {
        this.setState({ tag: event.target.value});
      }
    
      handleChangeDescription = event => {
        this.setState({ description: event.target.value});
      }
    
      handleChangeImage = event => {

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
          this.setState({
            image: file,
            imagePreviewUrl: reader.result,
            imagebase64:reader.result
          });
        }
    
        reader.readAsDataURL(file);
      }
      
      handleSubmit = event => {
        
        event.preventDefault();
        
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const urlapi = 'https://tinyinstagram-259109.appspot.com/addpost';

        axios.get(PROXY_URL+urlapi,{
            params: {
                description: this.state.description,
                id_user: localStorage.getItem('idUser'),
                picture : base64ToBlob(this.state.imagebase64),
                tags: this.state.tag
              },
              headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
            }
            })
           
          .then(res => {
            if (res.data[0] == 1) {
                this.state.isPosted = true;
                this.props.history.push({
                  pathname : '/homepage'
                }) 
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
          const imgSize = {
            
                height:'250px',
                width: '350px',
                "border-radius": '1.5em'
 
          };
          let {imagePreviewUrl} = this.state;
          let $imagePreview = null;
          if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} style ={imgSize} />);
          }
            return (
                <>
                <div className="App">
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
                        <div class="btn post-actions__upload">
                        {$imagePreview} 
                        </div>
                        
                        <br/>
                        <br/>
                        <input type="file" id="upload-image" name ="image" onChange={this.handleChangeImage} />

                        <input type="submit" value="Poster" />
                    </form>

                    <br/>
                    { this.state.isPosted && <div class="alert alert-success" role="alert">
                    Le post est crée avec succès
                  </div> }
                </div>
                </div>
            </>
            );
        }
    
}