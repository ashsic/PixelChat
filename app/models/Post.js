import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }],
  messages: []
});
