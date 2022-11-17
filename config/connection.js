const mongoose= require('mongoose');

//wrap mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost/nosonet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//Export connection
module.exports=mongoose.connection;
