const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const User = require("../../models/Game");

router.post('/',(req,res)=>{

    const newGame = new Games({
        winner: req.body.winner,
        loser: req.body.loser, 
        score: req.body.score

    });
})