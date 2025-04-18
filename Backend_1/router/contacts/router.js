const contactcontroller = require('./contactcontroller');
const express = require('express');
const { verifyToken} = require('./middleware');
const router = express.Router()



router.post('/addcontacts', verifyToken ,contactcontroller.createContact);

router.get('/allcontacts/:id',verifyToken,contactcontroller.getContacts);

router.delete('/users/:userId/contacts/:contactId',verifyToken,contactcontroller.deleteContact);

router.put('/users/:userId/contacts/:contactId',verifyToken,contactcontroller.updatecontact);

router.get('/users/:userId/contacts/:contactId', verifyToken,contactcontroller.getContactsById)


module.exports= router;


