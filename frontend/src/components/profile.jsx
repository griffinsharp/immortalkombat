import React, { Component } from 'react';
import Navbar from './Navbar';
import * as io from 'socket.io-client';

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
		return e =>
			this.setState({
				[field]: e.currentTarget.value
			});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.socket = io.connect("http://localhost:5000/games");
        this.socket.on("welcome", (msg) => {
            console.log("Received: ", msg);
        });
        this.socket.emit("joinRoom", this.state.code)
        this.socket.on('newUser', (res) => console.log(res));
        this.setState({code: ''})
    }

    render() {
        return (
            <div >
                <Navbar /> 
                <form onSubmit={this.handleSubmit} className='container'>
                    <input 
                        type="text"
                        placeholder='Code'
                        value={this.state.code}
                        onChange={this.update('code')} />
                    <button className='btn btn-flat' type="submit">
                        Go!
                    </button>
                </form>
            </div>
        )
    }
}

