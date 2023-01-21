console.log("*********MODELS*********");

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    access_token: { type: String }
}, { timestamps: true });




module.exports = mongoose.model('user', UserSchema);