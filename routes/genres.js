const express = require('express');
const router = express.Router()
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// const genres = [
//   { id: 1, name: 'Action' },
//   { id: 2, name: 'Horror' },
//   { id: 3, name: 'Romance' },
// ];

router.get('/:userId', async (req, res) => {
  console.log('req.params.user', req.params.user);
  const genres = await Genre.find({ user: req.params.userId }).sort({ name: 1 }) // also sort('name');//{user:req.params.user}
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
    user: req.body.user
  });
  genre = await genre.save(genre);
  res.send(genre);
  console.log(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    new: true
  })
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  // genre.name = req.body.name;
  res.send(genre);
  console.log(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  res.send(genre);
  console.log(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  // const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
  console.log(genre);
});

module.exports = router