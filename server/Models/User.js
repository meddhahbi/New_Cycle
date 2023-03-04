const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




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

var privateKey = "this is my secret key testjsdjsbdjdbdjbcjbkajdbqsjq"





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

exports.login=(email,password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return User.findOne({ email:email})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect();
                reject("this email does not exist");
            }else{
                bcrypt.compare(password, user.password).then((same)=>{
                    //console.log("same password");
                        if(same){
                            //?send token
                            let token = jwt.sign({
                                id:user._id,
                                username:user.username
                            },privateKey,{
                                expiresIn:'1h',
                            })
                            mongoose.disconnect();
                            resolve(token);
                            jwt.decode();


                        }else{
                            mongoose.disconnect();
                            reject('invalid password')
                        }
                }).catch((err)=>{
                    mongoose.disconnect();
                    reject(err);
                })
            }
        })
    })
}

