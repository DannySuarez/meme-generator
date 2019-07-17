const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/v1/memes', require('./routes/memes'));

module.exports = app;
