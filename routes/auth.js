const express = require('express');
const router = express.Router()
const { User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const Joi = require('joi');


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Invalid Email or Password');
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Invalid Email or Password');
  }
  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send(token);
  // res.send(token)
});

function validate(req) {
  const schema = {
    email: Joi.string().min(3).max(50).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router












module.exports = router