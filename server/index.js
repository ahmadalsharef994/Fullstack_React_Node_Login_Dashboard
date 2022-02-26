require('dotenv').config()  //import DotEnv package


const express = require('express')

const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors()) //only for dev environment

/* ------------------- Database Connection--------------------- */
const mongoose = require("mongoose") //mongoose ODM.
mongoose.connect(process.env.DATABASE) //connect to the database
mongoose.Promise = global.Promise; 

const User = require('./models/user.model') //User Schema
const jwt = require('jsonwebtoken')

app.post('/login', async (req, res) => {

    const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = req.body.password == user.password

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				email: user.email
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.post('/sendMessage', async (req,res)=>{

    const user = await User.findOne({
		email: req.body.to,
	})
    if (!user) {res.json({ status: "Destination not found", user: false })}
    else{
        user.messages.push(req.body)
    }
    await User.findOneAndUpdate({email: req.body.to}, user)

})

app.post('/checkInbox', async (req,res)=>{
  
    const user = await User.findOne({
		email: req.body.from,
	})
    if (user.messages)    {return res.json(user.messages)}
})

app.listen(1337, ()=>{
    console.log("listining on port 1337")
})