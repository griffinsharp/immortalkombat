import React, { Component } from 'react';
import * as io from "socket.io-client";

export default class WaitRoom extends Component {

    componentDidMount() {
        this.socket = io.connect("http://localhost:5000");
        this.socket.on("welcome", (data) => {
            console.log("Received: ", data);
        });
    }

    render() {
        return (
            <div className="waitroom-container">
                WaitRoom
            </div>
        )
    }
}
