import React, { Component } from "react";
import axios from 'axios';

export default class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        isSignedUp: false,
        lastName: ''
      }
    
      handleChangeFirstName = event => {
        this.setState({ firstName: event.target.value });
      }

      handleChangeLastName = event => {
        this.setState({ lastName: event.target.value });
      }

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });
      }

      handleChangePassword= event => {
        this.setState({ password: event.target.value });
      }
    
      handleSubmit = event => {
        event.preventDefault();
    
        const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
        const URL = 'https://tinyinstagram-259109.appspot.com/register';

        axios.get(PROXY_URL+URL,{
            params: {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName
              }
            })
            .then(res => {
              if (res.data[0] == 1) {
                  this.state.isSignedUp = true;
                  this.props.history.push('/inscription');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
      }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" name="firstName" placeholder="saisir votre nom" onChange={this.handleChangeFirstName}/>
                </div>

                <div className="form-group">
                    <label>Prénom</label>
                    <input type="text" className="form-control" name="lastName" placeholder="saisir votre prénom" onChange={this.handleChangeLastName} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" placeholder="saisir votre email" onChange={this.handleChangeEmail} />
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" name="password" placeholder="saisir votre mot de passe" onChange={this.handleChangePassword}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">S'inscrire</button>
                <p className="forgot-password text-right">
                    Déjà inscrit(e) <a href="/connexion">connexion?</a>
                </p>

                <br/>
                { this.state.isSignedUp && <div class="alert alert-success" role="alert">
                  Utilisateur crée avec succès
                </div> }
            </form>
        );
    }
}