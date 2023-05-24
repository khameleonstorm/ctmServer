const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  phone: {
    type: String,
    maxLength: 15,
    default: "",
  },
  country: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1000
  },
  balance: {
    type: Number,
    default: 0,
    minLength: 0,
  },
  trade: {
    type: Number,
    default: 0,
    minLength: 0,
  },
  withdraw: {
    type: Number,
    default: 0,
    minLength: 0,
  },
  bonus: {
    type: Number,
    default: 0,
    minLength: 0,
  },
  referredBy: {
    type: String,
    default: "",
    maxLength: 20
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isAffiliate: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  idVerified: {
    type: Boolean,
    default: false,
  },
});


userSchema.methods.genAuthToken = function(){
  return jwt.sign({_id: this._id, username: this.username, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY)
}

const User = mongoose.model("User", userSchema);


const  validateUser = (user) => {
  const schema = {
    fullName: Joi.string().min(3).max(20).required(),
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(5).max(225).email().required(),
    country: Joi.string().min(2).max(20).required(),
    password: Joi.string().min(5).max(20).required(),
    phone: Joi.string().min(0).max(15).allow(''),
    referredBy: Joi.string().min(0).max(20).allow(''),
  }

  return Joi.validate(user, schema)
}


const  validateLogin = (user) => {
  const schema = {
    email: Joi.string().min(5).max(225).email().required(),
    password: Joi.string().min(5).max(20).required(),
  }

  return Joi.validate(user, schema)
}


exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
exports.User = User;
exports.userSchema = userSchema;