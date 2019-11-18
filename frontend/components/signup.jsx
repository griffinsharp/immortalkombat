import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username:'',
            loginErrors: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = this.state;
        //NEED TO CALL THE RIGHT API ENDPOINT
    }

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>

                    <input type="email"
                        name="email"
                        placeholder="email"
                        defaultValue={this.state.email} onChange={this.handleChange} required />

                    <input type="username"
                        name="username"
                        placeholder="username"
                        defaultValue={this.state.username} onChange={this.handleChange} required />

                    <input type="password"
                        name="password"
                        placeholder="password"
                        defaultValue={this.state.passowrd} onChange={this.handleChange} required />

                    <button type='submit' className='btn btn-flat'>
                        Login
                        </button>
                </form>
            </React.Fragment>
        )
    }
}