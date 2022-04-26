const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VeriCodeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  deadline: {
    type: Number,
    default: Date.now() + 15 * 60 * 1000,
  },
})

module.exports = mongoose.model('veriCode', VeriCodeSchema)
