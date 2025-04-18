const User = require('./../../models/usermodel');
const jwt = require("jsonwebtoken")
const asyncErrorHandler = require('./../../utils/asyncErrorHandler');

const customError = require("./../../utils/customErrorHnadler");
require('dotenv').config()

const{secret_key}=process.env

const singtoken = id => {
    return jwt.sign({id},secret_key, {
        expiresIn:'1000000'
    })

}

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body); // Await the promise to be resolved or rejected
    // If created then it will assign to the variable. If rejected, we have to handle the rejected promise.
    
    res.status(201).json({
        status: "success",
        data: {
            user: newUser
        }
    });
});



exports.login = asyncErrorHandler(async(req, res, next)=>{
    const email= req.body.email
    const password= req.body.password

    //const {email, password}= req.body
    
    if(!email || !password){
        const error = new customError('Please provide email Id and password for login In!', 400);
        return next(error);
    }// if block checks that in req body email and password is presnt or not if not then error show

    // check if user exist with given email 
    const user= await User.findOne({email}).select('+password');

    //const ismatch = await user.comparePasswordInDb(password, user.password);

    //check if user exist and password matches
    if(!email || !(await user.comparePasswordInDb(password, user.password))){
        const error = new customError('Incorrect email or password', 400);
        return next(error);
    }
    const token = singtoken(user._id)
    const id = (user._id)
    const roles= (user.roles)
    
    res.status(200).json({
        status: 'success',
        token,
        id,
        roles
        
    })
})



