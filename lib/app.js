const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./middleware/notfound');
const error = require('./middleware/error');

app.use(cors());
app.use(express.json());
app.use('/api/v1/memes', require('./routes/memes'));
app.use(notFound);
app.use(error);

module.exports = app;
