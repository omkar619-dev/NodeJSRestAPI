const user = require('../models/user');

async function handleGetUsers(req,res) {
    const allDbUsers = await user.find({});
    res.setHeader('X-myName','Omkar_Shendge') // Custom header
    return res.json(allDbUsers);
}

async function handleGetUsersById(req,res) {
    const User = await user.findById(req.params.id);
    if(!User){
        return res.status(404).json({error:"User not found!"});
    }
    return res.json(User);
}

async function handleUpdateUsersById(req,res) {
    await user.findByIdAndUpdate(req.params.id,{last_name:"Changed it."});
    return res.json({status:"success!"});
    
}
async function handleDeleteUsersById(req,res) {
    await user.findByIdAndDelete(req.params.id);
    return res.json({status:"success"})
}

async function handleCreateUsers(req,res) {
    const body = req.body;
            if(!body.first_name || !body.last_name || !body.gender || !body.email){
                return res.status(400).json({msg:"All fields are required!"});
            }
            // users.push({id:users.length + 1,...body})
            // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data )=>{
            //     return res.status(201).json({status:'success', id:users.length})
            // })
           const result = await user.create({
                first_name:body.first_name,
                last_name:body.last_name,
                email:body.email,
                gender:body.gender,
                job_title:body.job_title
            });
            // console.log("result",result);
            return res.status(201).json({msg:"Success",id:result._id});
}

module.exports = {
    handleGetUsers,
    handleGetUsersById,
    handleUpdateUsersById,
    handleDeleteUsersById,
    handleCreateUsers
}