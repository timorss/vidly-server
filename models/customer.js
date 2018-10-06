const mongoose = require('mongoose')
const Joi = require('joi');


const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  phone: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  isGold: {
    type: Boolean,
    default: true
  }
})

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(2).max(20).required(),
    phone: Joi.string().min(2).max(20).required(),
    isGold: Joi.Boolean()
  };

  return Joi.validate(customer, schema);
}

const Customer = mongoose.model('Customer', customerSchema)

exports.Customer = Customer;
exports.validate = validateCustomer;