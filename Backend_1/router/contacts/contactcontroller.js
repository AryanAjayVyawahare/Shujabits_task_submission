const { create, findByIdAndDelete } = require("./../../models/usermodel");
const Contact = require("./../../models/contactmodel");

exports.createContact= async (req, res, next) =>{
    const user=req.user
    try{
        const contact= await Contact.create({
            user : req.user._id,
            ...req.body,
            
        });
        console.log(user)


        res.status(201).json({
        
            status: 'success',
            data: {
                contact
            }
    });
} catch (err){
    next(err);
}
};


 exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.params.id });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
  
exports.getContactsById = async (req, res)=>{
    try{
        const contact_Id = req.params.contactId;
        const user_Id = req.params.userId;
        
        const contact = await Contact.findOne({ _id: contact_Id, user: user_Id })
        res.status(200).json(contact)
    }catch(error){
        console.log(error)
        res.status(500).json({message:'server error', error})
    }
};


exports.deleteContact = async (req, res) => {
    try {
        const contact_Id = req.params.contactId;
        const user_Id = req.params.userId;

        // console.log(contact_Id);
        // console.log(user_Id);

        // Find the contact by ID and ensure it belongs to the correct user
        const contact = await Contact.findOneAndDelete({ _id: contact_Id, user: user_Id });
        console.log(contact);

        if (!contact) {
            return res.status(404).send({ message: 'Contact not found or not authorized' });
        }

        res.send({ message: 'Contact deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};


exports.updatecontact = async ( req, res)=>{
    try{
        const contact_Id = req.params.contactId;
        const user_Id = req.params.userId;
        console.log(contact_Id, user_Id)
        const body = req.body

        const contact = await Contact.findOneAndUpdate({ user:user_Id, _id:contact_Id},{
            name:body.name,
            phone:body.phone,
            email:body.email,
            date:body.date,
            description:body.description
        })
        return res.status(200).json(contact)
    }catch(err){
        res.status(500).send({message:'update error'})
    }
}


