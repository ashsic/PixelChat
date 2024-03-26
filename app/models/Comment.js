import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commenter: {
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
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  replies: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentReply"
    }],
    default: []
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
