const Joi = require("joi");
const mongoose = require("mongoose");


// Nin schema
const ninSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 225
  },
  nin: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10
  },
});



// nin model
const Nin = mongoose.model("Nin", ninSchema);


// validate Nin
function validateNin(nin) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(225).required(),
    email: Joi.string().min(5).max(225).required(),
    nin: Joi.string().min(10).max(10).required(),
  });

  return schema.validate(nin);
}


// exports
exports.Nin = Nin;
exports.validateNin = validateNin;