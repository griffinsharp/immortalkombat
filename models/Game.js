const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

module.exports = User = mongoose.model("users", UserSchema);