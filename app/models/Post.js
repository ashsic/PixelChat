import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },

  text: {
    type: String,
    validate: {
      validator: function(text) {
          return text.length > 0 && text.length < 1024;
      },
      message: 'Post must meet the length requirements.'
    }
  },

  timestamp: {
    type: Date,
    required: true,
    default: Date.now
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
      required: true,
      default: Date.now
    },
    likes: {
      type: Number,
      required: true,
      default: 0
    },
    // replies: [{
    //   replier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User' 
    //   },
    //   text: {
    //     type: String,
    //     required: true,
    //     validate: {
    //       validator: function(text) {
    //           return text.length > 0 && text.length < 512;
    //       },
    //       message: 'Comment must meet the length requirements.'
    //     }
    //   },
    //   timestamp: {
    //     type: Date,
    //     default: Date.now
    //   },
    //   likes: {
    //     type: Number,
    //     required: true,
    //     default: 0
    //   },
    // }]
  }],

  image: {
    type: String,
    required: true,
    // validate: {
    //   validator: function(arr) {
    //       return arr.length <= 4;
    //   },
    //   message: 'Limit of 4 images to a post'
    // }
  },
}, { timestamps: true });

// static methods

const Post = mongoose.model('Post', postSchema);

export default Post;
