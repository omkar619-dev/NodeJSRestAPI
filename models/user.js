const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    job_title:{
        type:String,
    },
    gender:{
        type:String,
        required:true,
    }
},{timestamps:true});

const user = mongoose.model("user",userSchema);

module.exports = user;