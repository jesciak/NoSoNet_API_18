const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'You must leave a thought'],
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
            reactions: [reactionSchema]
        }
    },
    {
        timestamps: true,
        toJSON: { getters: true, virtuals: true }
, id: false
    }

)
thoughtSchema.virtual('reactionCount').get(function () {

    return this.reactions && this.reactions.length;
})
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;