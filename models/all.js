
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var master = {};

var userSchema = new Schema({
    name: String,
    email: {
        type: String,
        index: true
    },
    verified:
    {
        type: Boolean,
        default: false
    },
    status: String,
    image: String,
    bitsId: String,
    batch: String,
    id: {
        type: String,
        index: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


master.Users = mongoose.model("User", userSchema, "Users");
module.exports = master;