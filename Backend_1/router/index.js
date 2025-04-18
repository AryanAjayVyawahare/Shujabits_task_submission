const express = require('express');
const app = express.Router()

const contactRoutes = require('./contacts/router');
const userRoutes = require('./user/router')


app.use('/users', userRoutes);
app.use('/contact',contactRoutes);

module.exports= app