import React, { Component } from 'react'
import axios from 'axios'

export default class stats extends Component {
    constructor(props){
        super(props);
        this.state={
            users = ''
        }
    }
    componentDidMount(){
        axios.get('/api/users/highscore')
        .then(res => {
            console.log(res);
            this.setState({users: res});
        })
    }

    render() {
        return (
            <div className='container'>
                <ol>
                    {this.state.users.map((user) => {
                    return <li>{user.username} {user.highscore}</li>
                    })}
                </ol>
            </div>
        )
    }
}
