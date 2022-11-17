const { User }= require('../models');

module.exports={
    // get all users
    getUsers(req,res){
        User.find({})
        .then((users)=>res.json(users))
        .catch((err)=> res.status (500).json(err));
    },
    //get single user by ID
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
        .select('__v')
        .populate('thought')
        .populate('friends')
        .then((user)=>
            !user
               ? res.status(404).json({ message: 'No user with that ID'})
               : res.json(user))
               .catch((err)=> res.status(500).json(err));
            },
    // create new user
    createUser({ body }, res){
        User.create(body)
    }
        })
    }
};
