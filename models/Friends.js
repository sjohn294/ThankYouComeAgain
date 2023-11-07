const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        friendId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        
        userName: {
            type: String,
            required: true,


        },
        friendsSince: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
