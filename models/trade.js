const Joi = require("joi");
const mongoose = require("mongoose");


// trade schema
const tradeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  amount: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 20000000
  },
  spread: {
    type: Number,
    required: true,
    maxLength: 20000000
  },
  progress: {
    type: Number,
    default: 0,
    maxLength: 20000000
  },
  status: {
    type: String,
    default: "pending",
    minLength: 4,
    maxLength: 20
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setHours(now.getHours() + 24);
      return now;
    },
  }
});



// trade model
const Trade = mongoose.model("Trade", tradeSchema);


// validate trade
function validateTrade(trade) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(225).required(),
    amount: Joi.number().min(1).max(20000000).required(),
    spread: Joi.number().min(0).max(20000000),
    progress: Joi.number().min(0).max(20000000),
  });

  return schema.validate(trade);
}


// exports
exports.Trade = Trade;
exports.validateTrade = validateTrade;