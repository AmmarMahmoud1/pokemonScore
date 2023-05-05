const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new mongoose.Schema({
    player1_name: String,
    player2_name: String,
    hp1: Number,
    hp2: Number,
    score1: Number,
    score2: Number,
    winner : String,
    date: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Game', gameSchema);
  