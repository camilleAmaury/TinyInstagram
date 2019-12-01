import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <form>

                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" placeholder="saisir votre nom" />
                </div>

                <div className="form-group">
                    <label>Prénom</label>
                    <input type="text" className="form-control" placeholder="saisir votre prénom" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="saisir votre email" />
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" placeholder="saisir votre mot de passe" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">S'inscrire</button>
                <p className="forgot-password text-right">
                    Déjà inscrit(e) <a href="/connexion">connexion?</a>
                </p>
            </form>
        );
    }
}