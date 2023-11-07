const { Schema, model } = require('mongoose');
const reactionSchema= require('./Reaction');


// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    userName: {
      type: String,
      required: true,
     
    },
    createdAt: {
      type: Date,
      default: Date.now,
      
    },
    
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
