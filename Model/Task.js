const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    ID:{
        type:String,
    },
    Title:{
        type:String,
    },
    UserID:{
        type:String,
    },
    Status:{
        type:String,    
    },
    Priority:{
        type:Number,
    }
})

module.exports = mongoose.model("Task",TaskSchema);