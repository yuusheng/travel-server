import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema({
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

export const Profile = mongoose.model('profile', ProfileSchema)
