import React, { Component } from 'react'
import axios from 'axios'

export default class stats extends Component {
    constructor(props){
        super(props);
        this.state={
            users:['']
        }
    }
    componentDidMount(){
        axios.get('/api/users/highscore')
        .then(res => {
            console.log('here')
            console.log(res.data);
            this.setState({users: res.data});
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
