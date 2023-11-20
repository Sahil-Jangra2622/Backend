const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    Id:{
        type:String,
    },
    Name:{
        type:String,
    },
    Available:{
        type:Boolean,
    },
    tasks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task",
        },
    ],
    avatar:{
        type:String,
    }

});

module.exports = mongoose.model("User",userSchema);