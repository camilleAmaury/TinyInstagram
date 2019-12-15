import React, { Component } from "react";
import axios from 'axios';


export default class LikePerOneSecond extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            begin_time: 0,
            end_time: 1000,
            isLiking: false,
            isDone: false,
            id_post: 0,
            time_spent: [],
            compteur:0
        }
    }

    componentDidMount = () => {
        // retrieve all users and there id and store them in an array
        // this.setState({isCreating:true});
        // const URL = 'https://tinyinstagram-259109.appspot.com/getallusers';
        // axios.get(URL).then(res => {
        //     if(res.data[0] !== 1){
        //         console.log(res.data[1]);
        //         this.setState({users:res.data[1]});
        //     }else{
        //         console.log("resquest failed to return datas");
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        // });

        let users = [
            5706627130851328,
            5633378543992832,
            5710353417633792,
            5637476211228672,
            5643280054222848,
            5704568633556992,
            5152998397313024,
            5744149642870784,
            5640825748848640,
            5667525748588544,
            5118606849343488,
            5629978607616000,
            5761168853434368,
            5659886813708288,
            5158257651875840,
            5738294193160192,
            5651673292734464,
            4809715754205184,
            6236692331626496,
            5650043017101312,
            6285217140572160,
            5097358505279488,
            4865725483188224,
            4818367227625472,
            5142238724096000
        ];
        this.setState({ users: users, id_post: 5632499082330112 });
    }

    Like = () => {
        let last_step = 0;
        let length = this.state.users.length;
        let time_spent = this.state.time_spent;
        let time_step = [];
        let i = 0;
        let end_time = 0;
        const url_likes = "https://tinyinstagram-259109.appspot.com/likepost";
        let begin_time = performance.now();
        while (i < length && end_time - begin_time < 1000) {
            axios.get(url_likes, {
                params: {
                    id_post: this.state.id_post,
                    id_user: this.state.users[i]
                }
            }).then(res => {
                if (res.data[0] === "1") {
                    time_step.push(performance.now() - begin_time);
                } else {
                    // ne se passe rien car le serveur n'a pas répondu correctement
                }
            });
            last_step = i;
            i++;
            end_time = performance.now();
        }
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
        hiddenElement.download = 'likeperformance.csv';
        hiddenElement.click();
    }



    render() {
        return (
            <div style={{ display: "flex", justifiyContent: "center", alignItems: "center" }}>
                <div>
                    <button onClick={() => this.state.isLiking ? "" : this.Like()}>Lancer le test des likes</button>
                    {this.state.compteur === this.state.borne - 1 ?
                        <span>Insertion finie</span>
                        :
                        <span>{this.isCreating ? "En cours d'insertion, veuillez patienter" + this.state.step + "/" + this.state.borne : "Appuyer sur le bouton"}</span>}
                </div>
                <div>
                    <button onClick={() => this.state.isDone ? this.PrintResult() : ""}>Afficher le résultat</button>
                </div>
                <div>
                    {this.state.compteur >= 10 ? <button onClick={() => this.ExportAsCSV()}>télécharger le résultat</button> : ""}
                </div>
            </div>
        );
    }

}