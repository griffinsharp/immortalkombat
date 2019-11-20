import React, { Component } from 'react'
import * as io from "socket.io-client";
import Repeatable from 'react-repeatable';

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
            // this.socket.on("message", msg => console.log(msg));
        }
    }

    createAction(action) {
        return JSON.stringify({
            action: action,
            username: this.state.username,
            room: this.state.code
        });
    }

    setAction(action) {        
        this.socket.emit("message", this.createAction(action));
    }

    renderButton(btnClassName, action) {
        return (
					<Repeatable
						className={btnClassName}
						onPress={() => this.setAction(action)}
						onHoldStart={() => this.setAction(action)}
						onHold={() => this.setAction(action)}
						onHoldEnd={() => this.setAction("")}
						onRelease={() => this.setAction("")}
					/>
				);
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
                            {this.renderButton('crossLeft', 'left')}
                            {this.renderButton('crossRight', 'right')}
                            <div className='crossCircle'></div>
                        </div>
                    </div>
                    <div className='controllerRight'>
                        <div className='backButton1Center'>
                            {this.renderButton('cornerLeft1', 'jump')}
                            {this.renderButton('cornerRight1', 'hammer')}
                        </div>
                        {/* <div className='backButton2Center'>
                            <div className= 'cornerLeft2'></div>
                            <div className= 'cornerRight2'></div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
