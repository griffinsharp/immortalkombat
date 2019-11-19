const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatSchema = new Schema({
    game: {
        type: Schema.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Stat = mongoose.model("stats", StatSchema);