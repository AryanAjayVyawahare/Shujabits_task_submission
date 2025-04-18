const jwt = require('jsonwebtoken');
const User = require('./../../models/usermodel');
const customError = require('./../../utils/customErrorHnadler');
//const { trace } = require('./router');

require('dotenv').config();

const{secret_key}=process.env;


const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userId = req.params.id;
    // console.log(userId)
    // console.log(token);
    

    if (!token) {
        return next(new customError('Authentication failed! No token provided.', 401));
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        
       // console.log(decoded)
        // If userId is provided in the URL params, check if it matches the decoded id
        if (userId && decoded.id !== userId) {
            return next(new customError('Authentication failed! User ID mismatch.', 401));
        }

        // If no userId is provided, or if it matches, attach the user to req
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new customError('Invalid token', 401));
    }
};

// const verifyRole = (allowedRoles) => {
//     return (req, res, next) => {
//         console.log("req.user.roles",req.user.roles);
        
//         if (!req.user || !req.user.roles  || !req.user.roles.some(role => allowedRoles.includes(role))) {
//             return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
//         }
//         next();
//     };
// };
module.exports={verifyToken};