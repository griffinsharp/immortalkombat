import React, { Component } from 'react';
import * as io from "socket.io-client";

export default class WaitRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: `${Math.floor(10000 + Math.random() * 90000)}`,
            username: 'Game'
        }
        this.players = [];
    }

    componentDidMount() {
        this.socket = io.connect("http://localhost:5000/games");
        this.socket.on("welcome", (msg) => console.log("Received: ", msg));
        this.socket.emit("joinRoom", JSON.stringify(this.state));
        this.socket.on("newUser", (res) => console.log(res));
        this.socket.on("message", msg => console.log(msg));
    }

    render() {
        return (
            <div className="waitroom-container">
                WaitRoom
                <br/>
                <p>
                    Enter the following code on your phone
                </p>
                <span>{this.state.code}</span>
            </div>
        )
    }
}
