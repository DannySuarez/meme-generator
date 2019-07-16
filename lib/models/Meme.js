const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  top: {
    type: String
  },
  image: {
    type: String
  },
  bottom: {
    type: String
  }
});

const Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;
