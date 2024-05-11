const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    Favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item' 
    }]
},
    { Timestamp: true })

const User = mongoose.model('User', userSchema)

module.exports = User