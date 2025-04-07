const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        data: {
            type: String,
            required: true,
            unique: true,
        },
        completed:{
            type:Boolean,
            defualt:false
        }
        
    },
    { timestamps: true }
);

 const Todo = mongoose.model("todo", todoSchema);
 module.exports = Todo;
 