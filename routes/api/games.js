const express = require("express");
const router = express.Router();
const passport = require("passport");
const Game = require("../../models/Game");

router.post('/',(req,res)=>{
    passport.authenticate('jwt', { session: false });
    const newGame = new Game({
        winner: req.body.winner,
        loser: req.body.loser, 
        winnerScore: req.body.score,
        loserScore: req.body.score
    });
    newGame.save().then((game) => res.json(game))
})
//  
//we could need validations if we want for the game but lets add them after 
// checking if it works 