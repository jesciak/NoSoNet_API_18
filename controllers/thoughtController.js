const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    //get single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('__v')
            // .populate('thought')
            // .populate('friends')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // create new thought to user
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.user.id },
                    { $push: { thought: _id } },
                    { new: true }
                )
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },
    // update thought by ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true, })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughttId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that ID' });
                }
                User.findOneAndUpdate(
                    { thought: dbThoughtData.params.thoughtId },
                    { $pull: { thought: params.thoughtId } },
                    { new: true })
                    .then((dbUserData) => {
                        if (!dbUserData) {
                            res.status(404).json({ message: 'No user with that ID' });
                            return;
                        }
                        res.json(dbUserData);
                    })
            })
            .catch((err) => res.status(500).json(err));
    },
    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },
    //delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.id } } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },
}