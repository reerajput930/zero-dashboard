//schema file
const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    extendedProps: {
        description: {
            type: String,
            required: true
        }
    },
   id:{
        type:String,
        required:false
    }

})
module.exports = mongoose.model("Event", eventSchema);
