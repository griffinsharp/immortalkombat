const express = require("express");
const router = express.Router();
const passport = require("passport");
const keys = require("../../config/keys");
const Game = require("../../models/Game");

router.post('/',(req,res)=>{
    passport.authenticate('jwt', { session: false });
    const newGame = new Game({
        winner: req.body.winner,
        loser: req.body.loser, 
        score: req.body.score
    });
    newGame.save().then((game) => res.json(game))
})
