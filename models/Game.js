const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    winner: {
        type: Schema.ObjectId,
        required: true
    },
    loser: {
        type: Schema.ObjectId,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model("games", GameSchema);