import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' 
  },
  replier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  text: {
    type: String,
    required: true,
    validate: {
      validator: function(text) {
          return text.length > 0 && text.length < 512;
      },
      message: 'Comment must meet the length requirements.'
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
});

const CommentReply = mongoose.model('CommentReply', replySchema);

export default CommentReply;
