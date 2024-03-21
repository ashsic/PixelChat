import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },

  content: {
    type: String,
    required: true
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

  comments: [{
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    content: {
      type: String,
      required: true
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
    replies: [{
      replier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      },
      content: {
        type: String,
        required: true
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
    }]
  }],

  images: {
    type: [Image],
    validate: {
      validator: function(arr) {
          return arr.length <= 4;
      },
      message: 'Limit of 4 images to a post'
    }
  }
});
