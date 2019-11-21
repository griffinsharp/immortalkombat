import React, { Component } from 'react';
import * as io from "socket.io-client";
import mario from './assets/mario_peace.png';
import luigi from './assets/luigi_peace.png';

export default class WaitRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: `${Math.floor(10000 + Math.random() * 90000)}`,
            username: 'Game',
            player1: '',
            player2: ''
        }
        this.players = [];
    }

    componentDidMount() {
        let hostname = window.location.hostname === 'localhost' ? 
            'http://localhost:5000/games' : `https://${window.location.hostname}/games`
        this.socket = io.connect(hostname);
        this.socket.on("welcome", (msg) => console.log("Received: ", msg));
        this.socket.emit("joinRoom", JSON.stringify(this.state));
        this.socket.on("newUser", (res) => {
            let data = JSON.parse(res)
            console.log(data.msg)
            if (this.players.length < 3 && data.username !== 'Game'){
                this.players.push(data.username);
                if (this.players.length === 1) this.setState({player1: data.username})
                if (this.players.length === 2) {
                    window.localStorage.setItem('gameRoom', JSON.stringify({
                        code: this.state.code,
                        players: this.players
                    }))
                    this.setState({player2: data.username});
                }
            }
            console.log(this.players);
        });
        this.socket.on("message", msg => console.log(msg));
    }

    renderPlayers() {
        if (this.players.length === 1) {
            return <div className="players">
                <div >
                    <span>{this.players[0]}</span>
                    <img src={mario} className="mario"/>
                </div>
            </div>
        } else if (this.players.length === 2) {
            return <div className="players">
                <div >
                    <span>{this.players[0]}</span>
                    <img src={mario} className="mario"/>
                </div>
                <div >
                    <img src={luigi} className="luigi"/>
                    <span>{this.players[1]}</span>
                </div>
            </div>
        }
    }

    render() {
        return (
            <div className="waitroom-container">
                <h1>Waiting for players to join...</h1>
                
                <ol>
                    <li>Open our website (in browser) on a smartphone</li>
                    <li>Click 'Join Game'</li>
                    <li>Enter the code below:</li>
                </ol>
                <span>{this.state.code}</span>
                {this.renderPlayers()}
            </div>
        )
    }
}
