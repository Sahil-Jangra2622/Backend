const Task = require("../Model/Task");
const User = require("../Model/User");

exports.addUser = async(req,res) => {

    try {

        const {Id,Name,Available} = req.body;
        let user = await User.findOne({Id,Name,Available});

        if(user){
            return res.status(500).json({
                succcess: false,
                message: "User already exists",
            })
        }

        user = await User.create({
            Id,
            Name,
            Available,
        })

        res.status(201).json({
            success: true,
            message: "User registerd successfully",
        });
        
    } catch (error) {
        return res.status(404).json({
            success:"false",
            message:"Invalid",
        })
    }
}

exports.getall = async (req,res) => {
    try {

        const users = await User.find();

        if(!users){
            return res.status(500).json({
                success: false,
                message: "User not found",
            })
        }
            console.log(users);

            let result = await Promise.all(
                users.map(async (idx)=>{
                    const name = {
                        Name:idx.Name,
                        Available:idx.Available,
                    };
                    return name;
                }),
                )
            return res.status(200).json({
            success: true,
            result,
            });

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Task not found",
        })
    }
}

exports.getUser = async (req, res) => {
    try {

        const {Name,Id} = req.query;
        console.log(Name,Id);

        let user = null;
        if(Name)
            user = await User.findOne({Name});
        if(Id){
            user = await User.findOne({Id});
        }
        
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        const name = user.Name;
        const av = user.Available;

        let tasks = await Promise.all(
            user.tasks.map(async (idx) => {
              const tsk = await Task.findById(idx._id);
              return tsk;
            })
          );
          
          console.log(tasks);
          

        return res.status(200).json({
            success:true,
            tasks,
            name,
            av,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User not found",
        });
    }
}