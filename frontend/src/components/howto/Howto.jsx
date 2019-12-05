import React from "react";
import NavBarContainer from "../nav/navbar_container";
import mobileBoard from '../assets/MobileStoryBoard.png';
import desktopBoard from '../assets/DesktopStoryBoard.png';


function HowTo() {
    return (
        <>
        <NavBarContainer/>
        <div className="howto-container">
    <div className='howto-info'> 
        <h1>Game Setup Instructions</h1>
        <p className='howto-requirement'> Requirements: 1 Laptop/Computer (Display), 2 Mobile Phones (Controller) </p>
         
         <div className="directions">
                <div className='mobile-howto'>
                    <h1>On your mobile phone(s):</h1>
                <img className='mobile' src={mobileBoard} alt="" />
            </div>
            <div className='desktop-howto'>
                    <h1>On your Desktop / Monitor:</h1>
                <img className='desktop' src={desktopBoard} alt="" />

            </div>
        </div>
    </div>

            <footer className="footer">Copyright &copy; 2019 ImmortalKombat</footer>
        </div>
        </>
    )
}

export default HowTo
