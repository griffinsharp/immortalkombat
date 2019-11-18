import React, { Component } from 'react'

export default class login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        // need to hit the right routes with a POST api call 
    }

    render() {
        return (
            <>
                <form action="">
                    <input type="text" placeholder='username' name='username' />
                    <input type="password" placeholer='password' name='password' />
                    <input type="submit" name='submit' onClick={this.handleSubmit} />
                </form>
            </>
        )
    }
}
