import React, { Component } from 'react'
import NavBarContainer from "../nav/navbar_container";
import axios from 'axios'

export default class leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.currentUser,
            users: ['']
        }
    }
    componentDidMount() {
        axios.get('/api/users/highscore')
            .then(res => {

                this.setState({ users: res.data });

            })
    }

    render() {
        return (
            <>
                <NavBarContainer />
                <div className='container'>
                    <ol>
                        {this.state.users.map((user, idx) => {
                            if (idx < 10) {
                                return <li>{user.username} {user.highscore}</li>
                            }
                        })}
                    </ol>
                    <hr />
                    <hr />
                    <>
                        {this.state.users.map((user, idx) => {

                            if (user.username === this.state.user.username) {
                                return <> {idx}. {user.username} {user.highscore}</>

                            }
                        })}
                    </>
                </div>
            </>
        )
    }
}
