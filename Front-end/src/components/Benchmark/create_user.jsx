import React, { Component } from "react";
import axios from 'axios';


export default class CreatePostsBenchmark extends Component {
    constructor() {
        super();
        this.state = {
            compteur:0,
            borne:500,
            step:0,
            isCreating:false,
        }
    }

    componentDidMount = () => {
        
    }

    createUsers = () => {
        this.setState({isCreating:true});
        const URL = 'https://tinyinstagram-259109.appspot.com/register';

        for(let i = this.state.step; i < this.state.borne; i++){
            let email = "user" + i.toString() + "@gmail.com";
            let pwd = "Tonclure" + i.toString();
            let fn = "Marine"  + i.toString();
            let ln = "Néperien" + i.toString();
            axios.get(URL, {
                params: {
                    email: email,
                    password: pwd,
                    firstName: fn,
                    lastName: ln
                }
            }).then(res => {
                if(res.data[0] !== 1){
                    console.log(res.data[1]);
                }else{
                    this.setState({compteur:this.state.compteur+1});
                }
            }).catch(function (error) {
                console.log(error);
            });
            this.setState({step:i});
        }
    }


    render() {
        return (
            <div style={{display:"flex", justifiyContent:"center", alignItems:"center"}}>
                <button onClick={() => this.state.isCreating ? "" : this.createUsers()}>Créer les {this.state.borne} users</button>
                {this.state.compteur === this.state.borne-1 ? 
                    <span>Insertion finie</span>
                    : 
                    <span>{this.isCreating ? "En cours d'insertion, veuillez patienter" + this.state.step+"/"+ this.state.borne : "Appuyer sur le bouton"}</span>}
            </div>
        );
    }

}