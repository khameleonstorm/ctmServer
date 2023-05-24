const Joi = require("joi");
const mongoose = require("mongoose");


// util schema
const utilSchema = new mongoose.Schema({
  margin: {
    type: Number,
    default: 0.0357,
    maxLength: 20
  },
  accountName: {
    type: String,
    default: 'Victor Brainstorm',
    minLength: 5,
    maxLength: 225
  },
  accountNumber: {
    type: Number,
    default: 1234567890,
    minLength: 1,
    maxLength: 10
  },
  bankName: {
    type: String,
    default: 'Opay',
    minLength: 1,
    maxLength: 225
  },
  walletCoin: {
    type: String,
    default: "USDT",
    minLength: 1,
    maxLength: 20
  },
  walletAddress: {
    type: String,
    default: "0x35493fedFA79Eb2831E1F8F05a70C1C0144c28cD",
    minLength: 10,
    maxLength: 225
  },
});


// util model
const Util = mongoose.model("Util", utilSchema);


// validate util
function validateUtil(util) {
  const schema = Joi.object({
    margin: Joi.number().min(0).max(20),
    accountName: Joi.string().min(5).max(225),
    bankName: Joi.string().min(1).max(225),
    accountNumber: Joi.number().min(1).max(10),
    walletCoin: Joi.string().min(1).max(20),
    walletAddress: Joi.string().min(10).max(225),
  });
  return schema.validate(util);
}


// exports
exports.Util = Util;
exports.validateUtil = validateUtil;