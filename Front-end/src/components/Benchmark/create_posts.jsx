import React, { Component } from "react";
import axios from 'axios';


export default class CreatePostsBenchmark extends Component {
    constructor() {
        super();
        this.state = {
            compteur: 0,
            borne: 1,
            step: 0,
            isCreating: false,
        }
    }

    componentDidMount = () => {

    }

    createUsers = () => {
        this.setState({ isCreating: true });

        for (let i = this.state.step; i < this.state.borne; i++) {
            let description = "je raconte ma vie sur les réseaux mdr ...";
            let id_user = localStorage.getItem("idUser");
            let picture = "1576434734966-nounours.jpg";
            let tags = "93, lafolie, reversetonclage";
            const urlapi = 'https://tinyinstagram-259109.appspot.com/addpost';

            axios.get(urlapi, {
                params: {
                    description: description,
                    id_user: id_user,
                    picture: '/uploads/' + picture,
                    tags: tags
                }
            }).then(res => {
                    if (res.data[0] == 1) {
                        console.log("posted");
                    }
                    else {
                        console.log(res);
                    }
            }).catch(function (error) {
                    console.log(error);
            });
            this.setState({ step: i });
        }
    }


    render() {
        return (
            <div style={{ display: "flex", justifiyContent: "center", alignItems: "center" }}>
                <button onClick={() => this.state.isCreating ? "" : this.createUsers()}>Créer les {this.state.borne} users</button>
                {this.state.compteur === this.state.borne - 1 ?
                    <span>Insertion finie</span>
                    :
                    <span>{this.isCreating ? "En cours d'insertion, veuillez patienter" + this.state.step + "/" + this.state.borne : "Appuyer sur le bouton"}</span>}
            </div>
        );
    }

}