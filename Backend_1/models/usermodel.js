const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");
const contact = require("./contactmodel")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,  
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minlength: 8,
        
        
    }, // initially the password was saved in the database in plain text but we dont want that we have encrypt the password
    // for that we use mongoose middleware or hook called document presaved middleware
    roles:{
        type:[String],
        default:['user']
    },
    confirmpassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate:{
            //this validator only work for save() & create
            validator:function(val){
                return val==this.password
            },
            message: 'Password and confirmpassword is not matching'
        }
    }

});

userSchema.pre("save", async function(next){
    if(!this.isModified('password'))return next(); 
    // this line simply check the password is modified or not if not modified then call the next function
    //otherwise encrypt the password before saving it to encrypt the password we have to install th library bcryptjs

    this.password= await bcrypt.hash(this.password, 12)   // hash is the function which hash our password first it salt the password
    //salting of the password mean it will add random strings to the password so that two same passwod do not genrate the same hash
    //12 is cost parameter if it high then longer time it take to encrypt the password it is the cpu intensive task
    
    this.confirmpassword= undefined;// we don't want to save the confirmpassword on the database 
    //it just for refrence to check paas & conf.pass are same
    next()

})

userSchema.methods.comparePasswordInDb= async function(pswd,pswdDB){
   return await bcrypt.compare(pswd , pswdDB)
}

const User = mongoose.model('User', userSchema);

module.exports = User;
