import React, { Component } from "react";
import axios from 'axios';


export default class RetrievePosts extends Component {
    constructor() {
        super();
        this.state = {
            begin_time: 0,
            end_time: 1000,
            isLiking: false,
            isDone: false,
            time_spent: [],
            n:10
        }
    }

    componentDidMount = () => {
        
    }

    Like = () => {
        let time_spent = this.state.time_spent;
        let time_step = [];
        let i = 0;
        const url_likes = "https://tinyinstagram-259109.appspot.com/getposts";
        let begin_time = performance.now();
            axios.get(url_likes, {
                params: {
                    n:this.state.n
                }
            }).then(res => {
                if (res.data.length === this.state.n) {
                    time_step.push(performance.now() - begin_time);
                } else {
                    console.log("ça ne marche pas");
                    // ne se passe rien car le serveur n'a pas répondu correctement
                }
            });
        time_spent.push(time_step);
        this.setState({ time_spent: time_spent, isDone: true, compteur: this.state.compteur + 1 });
    }

    PrintResult = () => {
        console.log(this.state.time_spent);
    }

    ExportAsCSV = () => {
        let csv = "";
        this.state.time_spent.forEach(function (row) {
            csv += row.join(',');
            csv += "\n";
        });

        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'retrievepostsperformance.csv';
        hiddenElement.click();
    }



    render() {
        return (
            <div style={{ display: "flex", justifiyContent: "center", alignItems: "center" }}>
                <div>
                    <button onClick={() => this.state.isLiking ? "" : this.Like()}>Lancer le test des retrieve posts</button>
                    {this.state.compteur === this.state.borne - 1 ?
                        <span>Insertion finie</span>
                        :
                        <span>{this.isCreating ? "En cours d'insertion, veuillez patienter" + this.state.step + "/" + this.state.borne : "Appuyer sur le bouton"}</span>}
                </div>
                <div>
                    <button onClick={() => this.state.isDone ? this.PrintResult() : ""}>Afficher le résultat</button>
                </div>
                <div>
                    <button onClick={() => this.ExportAsCSV()}>télécharger le résultat</button>
                </div>
            </div>
        );
    }

}