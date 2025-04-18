const todoModel = require("./../../models/todoModel");


exports.createContact= async (req, res, next) =>{
    try{
        const contact= await todoModel.create({
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