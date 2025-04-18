const express = require('express');
const router = express.Router()

const usercontroller = require('./usercontroller')


router.post('/login', usercontroller.login);
router.post('/signup', usercontroller.signup)




module.exports = router