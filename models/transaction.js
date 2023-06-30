const Joi = require("joi");
const mongoose = require("mongoose");


// deposit schema
const depositSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  from: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  method: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  status: {
    type: String,
    default: "pending",
    minLength: 4,
    maxLength: 20
  },
  amount: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 20000000
  },
  date: {
    type: Date,
    default: Date.now,
  }
});


// withdrawal schema
const withdrawalSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  from: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  wallet: {
    type: String,
    default: undefined
  },
  method: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  status: {
    type: String,
    default: "pending",
    minLength: 4,
    maxLength: 20
  },
  amount: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 20000000
  },
  date: {
    type: Date,
    default: Date.now,
  },
  bankName: {
    type: String,
    default: undefined
  },
  accountName: {
    type: String,
    default: undefined
  },
  accountNumber: {
    type: String,
    default: undefined
  },
});


//transfer schema
const transferSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  from: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  to: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  method: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20
  },
  status: {
    type: String,
    default: "pending",
    minLength: 4,
    maxLength: 20
  },
  amount: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 20000000
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


const Deposit = mongoose.model("Deposit", depositSchema);
const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
const Transfer = mongoose.model("Transfer", transferSchema);


// joi validation schema
function validateDeposit(deposit) {
  const schema = Joi.object({
    type: Joi.string().min(5).max(20).required(),
    from: Joi.string().min(5).max(225).required(),
    method: Joi.string().min(5).max(20).required(),
    status: Joi.string().min(4).max(20),
    amount: Joi.number().min(1).max(20000000).required()
  });
  return schema.validate(deposit);
}

function validateWithdrawal(withdrawal) {
  const schema = Joi.object({
    type: Joi.string().min(5).max(20).required(),
    from: Joi.string().min(5).max(225).required(),
    wallet: Joi.string().allow(''),
    method: Joi.string().min(5).max(20).required(),
    status: Joi.string().min(4).max(20),
    amount: Joi.number().min(1).max(20000000).required(),
    bankName: Joi.string().allow(''),
    accountName: Joi.string().allow(''),
    accountNumber: Joi.string().allow('')
  });
  return schema.validate(withdrawal);
}

function validateTransfer(transfer) {
  const schema = Joi.object({
    type: Joi.string().min(5).max(20).required(),
    from: Joi.string().min(5).max(225).required(),
    to: Joi.string().min(5).max(225).required(),
    method: Joi.string().min(5).max(20).required(),
    status: Joi.string().min(4).max(20),
    amount: Joi.number().min(1).max(20000000).required(),
  });
  return schema.validate(transfer);
}


exports.Deposit = Deposit;
exports.Withdrawal = Withdrawal;
exports.Transfer = Transfer;
exports.validateDeposit = validateDeposit;
exports.validateWithdrawal = validateWithdrawal;
exports.validateTransfer = validateTransfer;



