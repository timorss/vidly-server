
const mongoose = require('mongoose')
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config')
var cors = require('cors') //for the browser

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('could not connect to mongodb', err);
  })

  app.use(express.json());
  app.use(cors())
  app.use('/api/genres', genres)
  app.use('/api/customers', customers)
  app.use('/api/users', users)
  app.use('/api/auth', auth)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));