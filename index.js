const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json');
const app = express();
// const mongoose = require('mongoose');
const { type } = require('os');
const PORT  = 8383;
const userRouter = require('./routes/user')
const {logReqRes} = require('./middlewares/index')
const {connectMongoDB} = require('./connection')

//Connection
connectMongoDB("mongodb://localhost:27017/test-db-nodejs").then(()=>{console.log("MONGODB CONNECTED")});
//Schema

// Middleware plugins
app.use(express.urlencoded({extended:false}));
// app.use((req,res,next)=>{
//     console.log("Hello from middleware 1");
//     req.myUsername = 'OMKAR SHENDGE'
//     next();
// })
app.use(logReqRes('log.txt'));
app.use("/api/user",userRouter);


app.listen(PORT,()=>{
    console.log(`APP IS STARTED AT ${PORT}`)
})
