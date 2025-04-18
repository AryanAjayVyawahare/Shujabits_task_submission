import mongoose from "mongoose";

const schema = new mongoose.Schema({
    date:{
        type:Date,
        required:false
    },
    todo:{
        type:String,
        required:false 
    },

})

const todoItem = mongoose.model("todoItem",schema);

module.exports = todoItem;
