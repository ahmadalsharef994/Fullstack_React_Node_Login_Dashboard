const mongoose = require("mongoose") //Import mongoose  Object Data Modeling (ODM) 

const User = new mongoose.Schema({
    email:{type: String, required: true},
    password: {type: String, required: true},
    messages: {type: Array}
},
{
collection: "Users"
})

const model = mongoose.model('UserData', User)

module.exports = model