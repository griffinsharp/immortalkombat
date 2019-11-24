import React, { Component } from 'react'
import NavBarContainer from "../nav/navbar_container";
import axios from 'axios'

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
            <div className='container'>
                    <h1>{this.state.username}</h1>
                    <h2>highscore: {this.state.highscore}</h2>
                <ol>
                    winner loser time winnerHit LoserHit
                    {this.state.stats.map((stat) => {
                        return (<li>
                            {stat.winner} 
                            {stat.loser} 
                            {stat.time} 
                            {stat.winnerHitPercentage} 
                            {stat.loserHitPercentage}
                            </li>)
                    })}
                </ol>
                <hr/>
                <hr/>
                
            </div>
            </>
        )
    }
}
