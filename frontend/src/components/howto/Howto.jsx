import React from "react";
import NavBarContainer from "../nav/navbar_container";


function HowTo() {
    return (
        <>
        <NavBarContainer/>
        <div className="howto-container">
    <div className='howto-info'> 
        <h1>How To</h1>
            <p className='howto-requirement'> Requirement: Laptop/Computer (Display), 2 Mobiles Phones (Controller) </p>
            <p>1 - Signup as a new user or as a Demo User. </p>
            <p>2 - On your Laptop/Computer Click <b> Create Game</b> on Home page.</p>
            <p>3 - On your Mobile Phone Click <b> Join Game </b> on Home page, ender game code from the
                Game Room or use the QR code.
            </p>
            <p> 4 - After two player Connect the game will start. </p>
            <p> 5 - After each sucessful fight Stats are saved, navigate to <b>Stats</b>
                <b>Leaderboard</b> to see post games and hot you performed.
            </p>
    </div>

            <footer className="footer">Copyright &copy; 2019 ImmortalKombat</footer>
        </div>
        </>
    )
}

export default HowTo
