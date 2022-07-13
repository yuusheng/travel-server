import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export const User = mongoose.model('users', UserSchema)
