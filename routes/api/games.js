const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const Game = require("../../models/Game");
const validateRegisterInput = require("../../validation/registration");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => {
    res.json({ msg: "This is the games route" });
});


router.post('/',(req,res)=>{
    
    // passport.authenticate('jwt', { session: false });
    const newGame = new Game({
        winner: req.body.winner,
        loser: req.body.loser,
        time: req.body.time, 
        winnerHitPercentage: req.body.winnerHitPercentage,
        loserHitPercentage: req.body.loserHitPercentage
    });
    newGame.save().then((game) => res.json(game));
})
//  
//we could need validations if we want for the game but lets add them after 
// checking if it works\


module.exports = router;