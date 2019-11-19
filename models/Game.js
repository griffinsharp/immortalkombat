const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    playerTwo: {
        type: Schema.ObjectId,
        required: true
    },
    playerOne: {
        type: Schema.ObjectId,
        required: true
    },
    winner:{
        type: Schema.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model("games", GameSchema);