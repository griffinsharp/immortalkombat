import React, { Component } from 'react';
import * as io from "socket.io-client";

export default class WaitRoom extends Component {

    componentDidMount() {
        this.socket = io.connect("http://localhost:5000/games");
        this.socket.on("welcome", (msg) => {
            console.log("Received: ", msg);
        });
        this.socket.emit("joinRoom", "mario")
        // this.socket.on("err", (err) => console.log(err));
        this.socket.on("success", (res) => console.log(res));
    }

    render() {
        return (
            <div className="waitroom-container">
                WaitRoom
            </div>
        )
    }
}
