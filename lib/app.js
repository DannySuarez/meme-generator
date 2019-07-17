const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./middleware/notfound');

app.use(cors());
app.use(express.json());
app.use('/api/v1/memes', require('./routes/memes'));
app.use(notFound);

module.exports = app;
