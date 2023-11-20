const Task = require("../Model/Task");
const User = require("../Model/User");

exports.addTask = async(req,res) => {

    try {

        const {ID,Title,UserID,Status,Priority} = req.body;
        let task = await Task.findOne({ID,Title,UserID,Status,Priority});

        if(task){
            return res.status(500).json({
                succcess: false,
                message: "Task already exists",
            })
        }

        task = await Task.create({
            ID,
            Title,
            UserID,
            Status,
            Priority,
        })
        // console.log(task);
        const user = await User.findOne({Id:UserID});
        // console.log(user);

        if(!user.tasks.includes(task)){
            user.tasks.push(task);
            user.save();
        }

        res.status(201).json({
            success: true,
            message: "Task added",
        });
        
    } catch (error) {
        return res.status(404).json({
            success:"false",
            message:"Invalid",
        })
    }
}

exports.taskbystatus = async(req,res) => {
    try {

        const {Status} = req.query;

        const tasks = await Task.find({Status});
        if(!tasks){
            return res.status(404).json({
                success:false,
                message:"Task not found",
            })
        }

        return res.status(200).json({
            success:"true",
            tasks,
        })
        
    } catch (error) {
        return res.status(404).json({
            succcess: true,
            message:"Wrong task",
        });
    }
}

exports.taskbypriority = async(req,res) => {
    try {

        const {Priority} = req.query;

        const tasks = await Task.find({Priority});

        if(!tasks){
            return res.status(404).json({
                success:false,
                message:"Task not found",
            })
        }

        return res.status(200).json({
            success:"true",
            tasks,
        })
        
    } catch (error) {
        return res.status(404).json({
            success:"false",
            message:"Invalid",
        })
    }
}

exports.taskbyid = async(req,res) => {
    try {

        const {id} = req.query;
        console.log(id);

        const tasks = await Task.findById(id);
        console.log(tasks);

        if(!tasks){
            return res.status(404).json({
                success:false,
                message:"Task not found",
            })
        }

        return res.status(200).json({
            success:"true",
            tasks,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Wrong",
        })
    }
}

exports.findallstatus = async(req,res) => {
    try {

        const tasks = await Task.find();

        if(!tasks){
            return res.status(404).json({
                success:false,
                message:"no task",
            })
        }

        let status = await Promise.all(
            tasks.map(async (idx) => {
              const stat = idx.Status;
              return stat;
            })
          );
        // console.log("status",status);
        let stat = new Set(status.map(String));
        console.log(stat);
        let result=[...stat];

        return res.status(200).json({
            success:true,
            message:"Done",
            result,
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"No status",
        })
    }
}