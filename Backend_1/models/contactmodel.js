const mongoose = require("mongoose");
const validator = require('validator');
const User = require("./usermodel");

//define the schema
const contactSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type: String,
        required: [true, 'Please enter the contact name']
    },
    phone:{
        type: String,
        required: [true, 'Please enter the contact phone number'],
        validate: [validator.isMobilePhone, 'Please enter a valid phone number']
    },
    email:{
        type: String,
        required:true,
        validate: [validator.isEmail, 'Please enter a valid email'],
        unique:[true, 'please enter unique email id']
    },
      date:{
        type:Date,
        default:Date.now()
    },
    description:{      
        type:String,
        required:true
    }
    
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
