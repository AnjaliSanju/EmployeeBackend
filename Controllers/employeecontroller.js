
const Employee=require('../Models/employeeModel')

const getEmployee= async(req,res)=>{
    try {
        var posts=await Employee.find({});
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error:"Internal Server error"});
    }
}

const addEmployee = async(req,res)=>{
    try {
        console.log(req.body)
        var postItem={
            name:req.body.name,
            location:req.body.location,
            position:req.body.position,
            salary:req.body.salary
        }
        var post=new Employee(postItem);
        await post.save();
        res.status(201).json(postItem)
    } catch (error) {
        res.status(500).json({error:"Internal Server error"});
    }
}
const updateEmployee=async(req,res)=>{
    try {
               
        var postItem=await Employee.updateOne({_id:req.body._id},{name:req.body.name,position:req.body.position,location:req.body.location,salary:req.body.salary},{upsert: true})
        // var postItem = await Employee.findOne
        console.log(req.body._id)
        
        res.status(200).json(postItem)
    } catch (error) {
        res.status(500).json({error});

    }
}
const deleteEmployee=async (req,res)=>{
    try {
        console.log(req.body)
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Employee deleted'});
    } catch (error) {
        res.status(500).json({error:"Internal Server error"});
    }
}

const getEmployeeById=async(req,res)=>{
    try {
        const post=await Employee.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {

        res.status(500).json({error:"Internal Server error"});
    }
}
module.exports={getEmployee,addEmployee,updateEmployee,deleteEmployee,getEmployeeById}