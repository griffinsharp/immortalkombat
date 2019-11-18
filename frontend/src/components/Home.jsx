import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <>
        <div className="container">
            <h1 className='title'>Mortaaal Kombut</h1>
            <div>
                <p>
                    Mortal Kombat is an American media franchise centered on a 
                    series of video games, originally developed by Midway Games'
                     Chicago studio in 1992. The development of the first game 
                     was originally based on an idea that Ed Boon and John Tobias had of making a video game starring 
                     Jean-Claude Van Damme, but as that idea fell through, a fantasy-themed fighting game titled Mortal Kombat
                     was created instead. Mortal Kombat was the first ever fighting game to introduce a secret fighter, reached if the player fulfilled a set of requirements.
                     The original game has spawned many sequels and spin-offs consisting of several action-adventure games, films (animated and live-action with its own sequel), 
                     and television series (animated and live-action), as well as a comic book series, a card game and a live-action tour. Along with Street Fighter and Tekken, Mortal Kombat has become one of the most successful fighting franchises in the history of video games and one of the highest-grossing media franchises of all time.
                     The series has a reputation for high levels of violent content, including, most notably, 
                     its Fatalities (finishing moves allowing the player to finish off their defeated opponent). 
                     Controversies surrounding Mortal Kombat, in part, led to the creation of the ESRB video game rating system.
                     Early games in this series were also noted for their realistic digitized sprites and an extensive use of palette swapping to create new characters. Following Midway's bankruptcy, the Mortal Kombat development team was acquired by Warner Bros. and turned into NetherRealm Studios. Warner Bros. Interactive Entertainment currently owns the rights to the franchise, which it rebooted in 2011.
                </p>
            </div>
            
                <button className='btn'><Link to='/game'>Play</Link></button>
            
        </div>
        </>
    )
}


export default Home;
