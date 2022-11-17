const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: [true, 'Reaction is required'],
            maxlength: 280
        },
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dateFormat(date),
            timestamps: true,
            toJSON: { getters: true, virtuals: true }
        }
    }
);
module.exports= reactionSchema;