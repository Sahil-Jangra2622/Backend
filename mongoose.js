const mongoose = require('mongoose');
exports.connectDatabase = () => {
    mongoose
        .connect("mongodb+srv://shiv:shiv123@cluster0.tms4xip.mongodb.net/QuickSell")
        .then((con) => console.log(`Database Connected:`))
        .catch((err) => console.log(err));
}