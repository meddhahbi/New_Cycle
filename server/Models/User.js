const mongoose = require('mongoose');
require('dotenv').config();



let schemaUser = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phone:Number,
    role:String,
});


var User = mongoose.model('User',schemaUser);

var url = 'mongodb://localhost:27018/newCycle';
//var url = process.env.URL;

exports.testConnect=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            mongoose.disconnect();
           // console.log('Disconnected');
            resolve('connected')
        }).catch((err)=>reject(err))
    })
}


