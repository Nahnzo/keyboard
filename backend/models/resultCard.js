const mongoose = require('mongoose')

const resultsCardSchema = new mongoose.Schema({
  seconds: { type: String },
  accuracy: { type: String },
  wpm: { type: String },
  cpm: { type: String },
  created_At: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('ResultCard', resultsCardSchema)
