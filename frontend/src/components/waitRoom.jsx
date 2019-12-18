import React, { Component } from 'react';
import * as io from "socket.io-client";
import mario from './assets/mario_peace.png';
import luigi from './assets/luigi_peace.png';
import QRCode from 'qrcode.react'
import NavBarContainer from './nav/navbar_container';

export default class WaitRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: `${Math.floor(10000 + Math.random() * 90000)}`,
            username: 'Game',
            player1: '',
            player2: '',
            startGame: ''
        }
        this.players = [];
        this.playerIds = [];
    }

    componentDidMount() {
        let hostname = window.location.hostname === 'localhost' ? 
            'http://localhost:5000/games' : `https://${window.location.hostname}/games`
        this.socket = io.connect(hostname);
        // this.socket.on("welcome", (msg) => console.log("Received: ", msg));
        this.socket.emit("joinRoom", JSON.stringify(this.state));
        this.socket.on("newUser", (res) => {
            let data = JSON.parse(res)
            if (this.players.length < 3 && data.username !== 'Game'){
                this.players.push(data.username);
                this.playerIds.push(data.id);
                if (this.players.length === 1) this.setState({player1: data.username})
                if (this.players.length === 2) {
                    window.localStorage.setItem('gameRoom', JSON.stringify({
                        code: this.state.code,
                        players: this.players,
                        playerIds: this.playerIds
                    }))
                    this.setState({
                        player2: data.username,
                        startGame: 'Starting game now...'
                    });
                    setTimeout(() => {
                        this.props.history.push('/game')
                    }, 3000)
                }
            }
        });
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

    renderStartMsg() {
        if (this.state.startGame != '') return <div className="startmsg">
            <p>{this.state.startGame}</p>
        </div>
    }

    renderQRCode () {
        return (
        <QRCode size='230' value={this.state.code} />
        )
    }

    render() {
        return (
            <>
            <NavBarContainer />
            <div className="waitroom-container">
                <h1 className="wait-header">Waiting for players to join...</h1>
                    <h3 className="wait-subheader">Shortened Url: https://bit.ly/2Ynl3R6</h3>
                <ol>
                    <li>Open our website (in mobile browser) on a smartphone</li>
                    <li>Click 'Join Game'</li>
                    <li>Enter the code below:</li>
                </ol>
                <div style={{display: 'flex', flexDirection:'column', justifyContent:'center'}} className='code-display'>
                    <span style={{fontWeight: 'bold', textAlign:'center', paddingBottom: '1em', fontSize: '1.4em'}}>{this.state.code}</span>
                    {this.renderQRCode()}
                </div>
                {this.renderPlayers()}
                {this.renderStartMsg()}
            </div>
            </>
        )
    }
}
