const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt')




let schemaUser = mongoose.Schema({
    username:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{ type: Number, required: true },
    postal:{ type: Number, required: true },
    role: { type: String, enum: ['user', 'admin', 'association'], default: 'user' }
});




var url = 'mongodb://localhost:27018/newCycle';

var User = mongoose.model('User',schemaUser);
//var url = process.env.URL;

exports.register=(username,email,password,phone,postal,role)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return User.findOne({
                email:email
            }).then((doc)=>{
                if(doc){
                    mongoose.disconnect();
                    reject('this email is exist');
                }else{
                    bcrypt.hash(password,10).then((hashedPassword)=>{
                        let user = new User({
                            username:username,
                            email:email,
                            password:hashedPassword,
                            phone:phone,
                            postal:postal,
                            role:role
                        })
                        user.save().then((user)=>{
                            mongoose.disconnect();
                            resolve(user);
                        }).catch((err)=>{
                            mongoose.disconnect();
                            reject(err);
                        })
                    }).catch((err)=>{
                        mongoose.disconnect();
                        reject(err)
                    })
                }
            })
        })
    })
}


