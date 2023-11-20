const app = require("./app"); 
const { connectDatabase } = require("./mongoose");

connectDatabase();

app.listen(4000,(req,res)=>{
    console.log(`Server is runnning`);
});