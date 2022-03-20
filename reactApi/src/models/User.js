const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    salt: String,
    movements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Operation"
    }],
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', User)