import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Saisir votre email" />
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" placeholder="Saisir votre mot de passe" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Connexion</button>
                <p className="forgot-password text-right">
                    Avez vous oublié votre <a href="#">mot de passe?</a>
                </p>
            </form>
        );
    }
}
