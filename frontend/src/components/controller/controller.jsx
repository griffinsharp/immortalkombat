import React, { Component } from 'react'
import * as io from "socket.io-client";

export default class Controller extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: this.props.game.room,
            username: this.props.currentUser.username
        }
    }

    componentDidMount() {
        if (this.state.code === undefined) {
            this.props.history.push('/play')
        } else {
            this.socket = io.connect("http://localhost:5000/games");
            this.socket.emit("joinRoom", JSON.stringify(this.state));
            this.socket.on("newUser", res => {
                let data = JSON.parse(res);
                console.log(data.msg);
            });
            this.socket.on("message", msg => console.log(msg));
        }
    }

    createAction(action) {
        return JSON.stringify({
            action: action,
            username: this.state.username,
            room: this.state.code
        });
    }

    render() {
        return (
            <div>
                <div className='cable'></div>
                <div className='controller'>
                    <div className='centerBlue'>
                        <div className='centerLeft'></div>
                        <div className='centerRight'></div>
                    </div>
                    <div className='centerStart'>
                        <div className='SLeft'></div>
                        <div className='SRight'></div>
                    </div>
                    <div className='centerSelect'>
                        <div className='SLeft'></div>
                        <div className='SRight'></div>
                    </div>

                    <div className='controllerLeft'>
                        <div className='circle'></div>
                        <div className='crossCenter'>
                            <div className='crossLeft' 
                                onClick={() => 
                                    this.socket.emit(
                                        "message",
                                        this.createAction('left'))}>
                            </div>
                            <div className='crossRight'
                                onClick={() =>
                                    this.socket.emit(
                                        "message",
                                        this.createAction('right'))}>
                            </div>
                            <div className='crossCircle'></div>
                        </div>
                    </div>
                    <div className='controllerRight'>
                        <div className='backButton1Center'>
                            <div className= 'cornerLeft1'
                                onClick={() =>
                                    this.socket.emit(
                                        "message",
                                        this.createAction('jump'))}
                            ></div>
                            <div className= 'cornerRight1'
                                onClick={() =>
                                    this.socket.emit(
                                        "message",
                                        this.createAction('hammer'))}
                            ></div>
                        </div>
                        {/* <div className='backButton2Center'>
                            <div className= 'cornerLeft2'></div>
                            <div className= 'cornerRight2'></div>
                        </div> */}
                    </div>
                </div>
                {/* <button
                    onClick={() =>
                        this.socket.emit(
                            "message",
                            this.createAction('up'))}
                >up</button>
                <button
                    onClick={() =>
                        this.socket.emit(
                            "message",
                            this.createAction('down'))}
                >down</button>
                <button
                    onClick={() =>
                        this.socket.emit(
                            "message",
                            this.createAction('jump'))}
                >jump</button>
                <button
                    onClick={() =>
                        this.socket.emit(
                            "message",
                            this.createAction('hammer'))}
                >hammer</button> */}
            </div>
        )
    }
}
