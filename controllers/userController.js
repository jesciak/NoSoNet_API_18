const { User } = require('../models');

module.exports = {
    // get all users
    getUsers(req, res) {
        User.find({})
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },
    //get single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('__v')
            .populate('thought')
            .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // create new user
    createUser(req,res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) =>
             res.status(500).json(err));
            
    },
    // update user by ID
    updateUser({ params, body }, res) {
        User.findByIdAndUpdate({ _id: params.id }, body, { new: true, runValidators: true, })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' });
                }
                return Thought.deleteMany({ _id: { $in: dbUserData.thought } });
            })
            .then(() => {
                res.json({ message: 'User has been deleted' });

            })
            .catch((err) => res.status(500).json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with that ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(500).json(err));
    },
}
