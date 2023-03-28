const mongoose = require("mongoose");


const structure = mongoose.Schema({
  taskDesc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "todo",
  },
  tags: {
    type: [String],
  },
});


const taskModel = mongoose.model("Task", structure);


module.exports =  taskModel
