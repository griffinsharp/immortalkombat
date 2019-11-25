const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    winner: {
        type: String,
        required: true
    },
    loser: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    winnerHitPercentage: {
        type: Number,
        required: true
    },
    loserHitPercentage: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model("games", GameSchema);