const express = require('express');
const {handleGetUsers,handleGetUsersById,handleUpdateUsersById,handleDeleteUsersById,handleCreateUsers} = require('../controllers/user');
const router = express.Router();

// router.get('/users',(req,res)=>{
//     const html =  `<ul> 
//     ${users.map(user => `<li>${user.first_name}</li>`).join("")}
//      </ul>`
//  res.send(html);
 
// });


// ROUTES

router.route("/").get(handleGetUsers).post(handleCreateUsers)
router.get('/:id',handleGetUsersById);



router.patch('/:id',handleUpdateUsersById);

router.delete('/:id',handleDeleteUsersById);

module.exports = router;


// (req,res)=>{
    
//     const id = Number(req.params.id);
//     const body = req.body;
//     const userIndex = users.findIndex((user) => user.id === id);
//     if (userIndex === -1) {
//         return res.status(404).json({ error: "User not found" });
//       }
//     users[userIndex] = { ...users[userIndex], ...body };
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ error: "Failed to save data" });
//         }
//         return res.json({ status: 'success', updatedUser: users[userIndex] });
//       });
// }