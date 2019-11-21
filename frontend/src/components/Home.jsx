import React from 'react'
import {Link} from 'react-router-dom';
import iPhone from './assets/iphonemockup.png';
import cloud from './assets/transparentclouds.png';


const Home = () => {
    return (
        <>
        <div className="home-inner-container">
            <div className="headers">
                    <h1 className='title'>Immario Kombat</h1>
                    <h3 className='subtitle'>A Mobile Multiplayer Webgame</h3>
            </div>
            
            <div className='tagline'>
                <p>
                    Like mortal kombat and super mario bros had a baby...
                </p>
                <p>
                    Use your mobile device for this 2D fighter rendition to decide 
                    once and for all who has the better moustache. 
                </p>
            </div>

                <div className='cloud-container'>
                    <img className='cloud' src={cloud} alt="" />
                </div>
            <div className='iphone-mockup-container'>
                <img className='iphone-mockup' src={iPhone} alt=""/>
            </div>
           
            <button className='btn'><Link to='/game' style={{color:'white', textDecoration:'none'}}>Play</Link></button>            
        </div>
        </>
    )
}


export default Home;
