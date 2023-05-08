const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
PORT = process.env.PORT || 5000;
const taskRouter = require('./router/task')
const eventRouter = require('./router/event')
require('dotenv').config()


app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use(cors())
app.use(express.json())
app.use('/api',taskRouter)   
app.use('/api',eventRouter)   




// connecting to the mongodb 
console.log(process.env.dbusername)
mongoose.connect(
  `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@nodeexpress-project.i1wimde.mongodb.net/task-manager-dashboard?retryWrites=true&w=majority`
  ).then(()=>{
    app.listen(PORT, () => {
      console.log(`listing on the port ${PORT}`);
    });
    
}).catch((error)=>{
  console.log(error)
}) 


