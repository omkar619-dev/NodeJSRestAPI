const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json');
const app = express();
const mongoose = require('mongoose');
const { type } = require('os');
const PORT  = 8383;

//Connection
mongoose.connect("mongodb://localhost:27017/test-db-nodejs").then(()=>{console.log("MONGO DB CONNECTED!")})
 .catch(err => console.log("MONGODB CONNECTION ERROR",err) );
//Schema
const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    job_title:{
        type:String,
    },
    gender:{
        type:String,
        required:true,
    }
},{timestamps:true});

const user = mongoose.model("user",userSchema);

// Middleware plugins
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    req.myUsername = 'OMKAR SHENDGE'
    next();
})
app.use((req,res,next)=>{
    fs.appendFile("./log.txt",`\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,(err,data)=>{
            next();
    })
})
app.get('/users',(req,res)=>{
    const html =  `<ul> 
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
     </ul>`
 res.send(html);
 
})


// ROUTES
app.get('/api/users',async(req,res)=>{
    const allDbUsers = await user.find({});
    res.setHeader('X-myName','Omkar_Shendge') // Custom header
    return res.json(allDbUsers);
})

app.get('/api/users/:id',async (req,res)=>{
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id)
    const User = await user.findById(req.params.id);
    if(!User){
        return res.status(404).json({error:"User not found!"});
    }
    return res.json(User);
})

app.post('/api/users',async (req,res)=>{
        
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
        return res.status(201).json({msg:"Success"});
})

app.patch('/api/users/:id',(req,res)=>{
    
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }
    users[userIndex] = { ...users[userIndex], ...body };
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to save data" });
        }
        return res.json({ status: 'success', updatedUser: users[userIndex] });
      });
});

app.delete('/api/users/:id',async (req,res)=>{
    await user.findByIdAndDelete(req.params.id);
    return res.json({status:"success"})
})

app.listen(PORT,()=>{
    console.log(`APP IS STARTED AT ${PORT}`)
})
