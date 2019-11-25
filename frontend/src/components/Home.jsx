import React from 'react'
import {Link} from 'react-router-dom';
import iPhone from './assets/iphonemockup.png';
import cloud from './assets/transparentclouds.png';


const Home = () => {
    return (
        <div className="home-inner-container">
            <div className="headers">
                    <h1 className='title'>Immario Kombat</h1>
                    <h3 className='subtitle'>A Mobile Multiplayer Webgame</h3>
            </div>
            <div className="top-container">
                    
                    <div className='cloud-container'>
                        <img className='cloud' src={cloud} alt="" />
                    </div>
                    <div className='cloud-container'>
                        <img className='cloudtwo' src={cloud} alt="" />
                    </div>
                    <div className="iphone-tag">
                        <div className='tagline'>
                            <p>
                                Like mortal kombat and super mario bros had a baby...
                            </p>
                            <p>
                                Use your mobile device in this 2D fighter rendition of a classic title.
                                Duke it out as Mario and Luigi to settle the age-old discussion: who has the better moustache?.
                            </p>
                            <div className="button-container">
                                <Link to='/waitroom' ><button type="button" className='btn btn-play '>Create Game</button></Link>
                                <Link to='/play' ><button type="button" className='btn btn-play '>Join Game</button></Link>
                            </div>
                            
                        </div>

                            <img className='iphone-mockup' src={iPhone} alt="" />

                    </div>
                    
            </div>
            
               
                
           
                            
            
        </div>
    )
}


export default Home;
