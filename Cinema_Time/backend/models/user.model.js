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
        unique: true ,
        trim: true
    },
    password: {  
        type: String,
        required: true,
        trim: true,
        select: false // Exclude the password field from query results
    },
    gender:{ 
        type : String, 
        required: true,
    },
    isAdmin:{ 
        type : Boolean, 
        default: false
    } },
    { Timestamp: true })

    const User = mongoose.model('User', userSchema)

    module.exports = User