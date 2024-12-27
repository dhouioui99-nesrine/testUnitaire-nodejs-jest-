const Employee = require('../models/employee')






const create = async (req, res, next) => {
    try {
        const { name, email, position, salary } = req.body;
        const newEmployee = await Employee.create({
            name,
            email,
            position,
            salary,
        });

        if (newEmployee) {
            return res.status(201).send("Employee created successfully");
        }

        return res.status(406).send("Something went wrong!");
    } catch (err) {
        next(err);
    }
};


//get all
const getAllemployee = async (req,res,next)=>{
    try{
    const employee = await Employee.find();

    
    if(employee.length >0){
        return res.status(200).send(employee);
    }

    return res.status(404).send("Employee Not Found");

    }catch(err){
        next(err);
    }

}

//udpate 

const updateEmployee = async (req,res,next)=>{
    try{
    const updateEmployee = await Employee.updateOne({_id:req.params.id},{
        $set:{
            name:req.body.name,
            email:req.body.email,
            position:req.body.position,
            salary:req.body.salary,         
       
        }
    });

    if(updateEmployee){
        return res.status(200).send("Employee updated Successfully");
    }
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


//delete
const deleteEmployee = async (req,res,next)=>{
    try{
    const deleteEmployee = await Employee.findByIdAndDelete({_id:req.params.id});
    if(deleteEmployee){
        return res.status(200).send("Employee Deleted Successfully");
    }

    return res.status(404).send("Emlpoyee Not Found !!!");
}catch(err){
    //return res.satuts(500).send(err.message);
    next(err);
}
}


//get by id
const getemployeeById = async (req,res,next)=>{
    try{
    const employee = await Employee.findById(req.params.id);

    if(employee){
        return res.status(200).send(employee);
    }
    return res.status(404).send("Not employee Found By this ID");
}catch(err){
    //return res.status(500).send(err.message);
    next(err);
}
}


module.exports = {create,getAllemployee,getemployeeById,updateEmployee,deleteEmployee};