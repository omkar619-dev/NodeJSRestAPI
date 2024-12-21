const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json');
const app = express();
const PORT  = 8383;
app.use(express.urlencoded({extended:false}));
app.get('/users',(req,res)=>{
    const html =  `<ul> 
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
     </ul>`
 res.send(html);
 
})


// ROUTES
app.get('/api/users',(req,res)=>{
    return res.json(users);
})

app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user);
})

app.post('/api/users',(req,res)=>{
        
        const body = req.body;
        users.push({id:users.length + 1,...body})
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data )=>{
            return res.json({status:'success', id:users.length})
        })
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

app.delete('/api/users/:id',(req,res)=>{
    // TODO
    return res.json({status:"pending"})
})

app.listen(PORT,()=>{
    console.log(`APP IS STARTED AT ${PORT}`)
})
