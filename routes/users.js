const bcrypt = require('bcrypt')
const express = require('express')
const { User, validateUser, validateLogin } = require("../models/user")
const { Util } = require("../models/util")
const { welcomeMail, passwordReset } = require("../utils/mailer")

const router  = express.Router()

// getting single user
router.get('/:id', async(req, res) => {
  try {
    let user = await User.findById(req.params.id)
    if(!user) return res.status(400).send({message: "user not found"})
    res.send(user)
  } catch (x) { return res.status(500).send({message: "Something Went Wrong..."}) }
})


// get all users by referral
router.get('/referral/:username', async(req, res) => {
  const { username } = req.params

  try {
    const users = await User.find({ referredBy: username })
    if(!users) return res.status(400).send({message: "user not found"})
    res.send(users)
  } catch (x) { return res.status(500).send({message: "Something Went Wrong..."}) }
})


// getting all users
router.get('/', async(req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (x) { return res.status(500).send({message: "Something Went Wrong..."}) }
})


// verify user
router.post('/verify', async(req, res) => {
  const { email } = req.body

  try {
    let user = await User.findOne({ email })
    if(!user) return res.status(400).send({message: "user not found"})
    
    user.isVerified = true
    user = await user.save()
  
    res.send({message: "User verified successfully"})
  } catch (error) { return res.status(500).send({message: "Something Went Wrong..."}) }
})

// Resend verification email
router.post('/resend-email', async(req, res) => {
  const { email } = req.body

  try {
    let user = await User.findOne({ email })
    if(!user) return res.status(400).send({message: "user not found"})
    if(user.isVerified) return res.status(400).send({message: "User already verified"})
    welcomeMail(user.username, user.email)
  
    res.send({message: "Email sent successfully"})
  } catch (error) { return res.status(500).send({message: "Something Went Wrong..."}) }
})


// login user
router.post('/login', async(req, res) => {
  const { email, password } = req.body
  const { error } = validateLogin(req.body)
  if(error) return res.status(400).send({message: error.details[0].message})

  try {
    let user = await User.findOne({ email })
    if(!user) return res.status(400).send({message: "Invalid email"})
  
    const validatePassword = await bcrypt.compare(password, user.password)
    if(!validatePassword) return res.status(400).send({message: "Invalid password"})
  
    const token = await user.genAuthToken()
    res.send({token, user})
  } catch (error) { for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})




//create a new user
router.post('/signup', async (req, res) => {
  const {fullName, username, email, country, phone, password, referredBy} = req.body
  const { error } = validateUser(req.body)
  if(error) return res.status(400).send({message: error.details[0].message})

  let user = await User.findOne({ $or: [{email}, {username}] })
  if(user) return res.status(400).send({message: "username or email already exists"})

  let refUser = await User.findOne({ username: referredBy})
  const util = await Util.findOne()

  user = new User({fullName, username, email, password, country, phone, referredBy: refUser?.username})

  try{
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    user = await user.save()
    welcomeMail(user.username, user.email)
    const token = await user.genAuthToken()

    if(refUser) {
      const bonus = refUser.bonus + util.bonus
      console.log(bonus)
      refUser.set({ bonus });
      await refUser?.save()
    }


    res.send({token, user})
  }
  catch(e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
})



// reset password
router.post('/reset-password', async(req, res) => {
  const { email } = req.body
  if(!email) return res.status(400).send({message: "Email is required"})

  try {
    passwordReset(email)
    res.send({message: "Password reset link sent successfully"})
  } catch (error) { return res.status(500).send({message: "Something Went Wrong..."}) }

})


module.exports = router