const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new mongoose.Schema({
    player1_name: String,
    player2_name: String,
    player1_score: String,
    player2_score: String,
    date: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('Game', gameSchema);
  