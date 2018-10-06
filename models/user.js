const mongoose = require('mongoose')
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
