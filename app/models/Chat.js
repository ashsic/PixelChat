import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  }],

  name: {
    type: String,
    default: this.participants
  },

  messages: {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },

    text: {
      type: String,
      required: function() {
        return !this.image; 
      },
      validate: {
        validator: function(text) {
            return text.length > 0 && text.length < 1024;
        },
        message: 'Message must meet the length requirements.'
      }
    },

    image: {
      type: Image, //?
      required: function() {
          return !this.text; 
      }
    },

    likes: {
      type: Number,
      required: true,
      default: 0
    },
  },
});
