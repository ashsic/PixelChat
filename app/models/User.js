import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    // required: true
  },
  bio: {
    type: String
  },
  picture: {
    type: String
  },
  chats: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }],
    required: true,
    default: []
  },
  posts: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    required: true,
    default: []
  },
  followers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    required: true,
    default: []
  },
  following: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    required: true,
    default: []
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
