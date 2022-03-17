const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: String,
    ref: 'users',
    required: true,
  },
  sex: String,
  birth: Date,
  school: String,
  job: String,
  bio: String,
  target: [
    {
      title: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
})

module.exports = User = mongoose.model('profile', ProfileSchema)
