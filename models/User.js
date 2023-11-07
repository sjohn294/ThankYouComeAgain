const { Schema, model } = require('mongoose');


// Schema to create Student model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
     
    },
    password: {
      type: String,
      required: true,
      min_length: 8,
    },
    thoughts: [
        {type: Schema.Types.ObjectId, ref: "thought"}
    ],
    friends: [
        {type: Schema.Types.ObjectId, ref: "user"}
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
