const mongoose = require('mongoose')

async function connectMongoDB(url){
   return  mongoose.connect(url);
    //  .then(()=>{console.log("MONGO DB CONNECTED!")})
    //  .catch(err => console.log("MONGODB CONNECTION ERROR",err) );
}

module.exports = {
    connectMongoDB
};