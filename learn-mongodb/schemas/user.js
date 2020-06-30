const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    nick: {
        type: String,
        required: true,
        unique: true,
    },
    comment: {
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User',userSchema);