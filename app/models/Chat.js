import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [{
    type: String,
  }],
  name: {
    type: [String],
    default: []
  },
  messages: [{
    sender: {
      type: String
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
      type: String, //?
      required: function() {
          return !this.text; 
      }
    },
    likes: {
      type: Number,
      required: true,
      default: 0
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    hidden: { // Instead of deletion
      type: Boolean,
      default: false
    }
  }],
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
