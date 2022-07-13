import mongoose from 'mongoose'

const VeriCodeSchema = new mongoose.Schema({
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

export const VeriCode = mongoose.model('veriCode', VeriCodeSchema)
