import React, { Component } from 'react'
import NavBarContainer from "../nav/navbar_container";
import axios from 'axios';

export default class stats extends Component {
    constructor(props){
        super(props);
        this.state={
            user: props.currentUser,
            username:'',
            highscore:0,
            stats:[]
        }
    }
    componentDidMount(){
        //${this.state.user.id} change hardcoded value for that 
        axios.get(`/api/users/stats/${this.state.user.id}`) 
        .then(res => {
            
            this.setState({username: res.data[0].username});
            this.setState({highscore: res.data[0].highscore });
            this.setState({stats: res.data[0].stats});

        })
    }

    render() {
        return (
			<>
                
			<NavBarContainer />
            <div className='stats-container'>
                    <h1>{this.state.username}</h1>
                    <h2>highscore: {this.state.highscore}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Winner</th>
                                <th>Loser</th>
                                <th>Time</th>
                                <th>WinnerHit</th>
                                <th>LoserHit</th>
                            </tr>
                        </thead>
                        <tbody>

                    {this.state.stats.map((stat) => {
                        return (
                            <tr>
                                <td>{stat.winner}</td>
                                <td>{stat.loser}</td>
                                <td>{stat.time}</td>
                                <td>{stat.winnerHitPercentage}</td>
                                <td>{stat.loserHitPercentage}</td>
                            </tr> 
                                )
                    })}
                        </tbody>
                        <tfoot>
                            <tr>
                            </tr>
                        </tfoot>
                    </table>
                <hr/>
                <hr/>
                
            </div>
            </>
        )
    }
}

