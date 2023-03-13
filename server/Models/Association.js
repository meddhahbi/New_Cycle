const route = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



let schemaAssociation = mongoose.Schema({
    name:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{ type: Number, required: true },
    postal:{ type: Number, required: true },
    isActive : {type:Boolean,default:false},
    docVerif:String,
    role: { type: String,  default: 'association' }
});

var Association = mongoose.model('Association',schemaAssociation);
var url = process.env.URL;

var privateKey = "this is my secret key testjsdjsbdjdbdjbcjbkajdbqsjq"





exports.register=(name,email,password,phone,postal,docVerif)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return Association.findOne({
                email:email
            }).then((doc)=>{
                if(doc){
                    mongoose.disconnect();
                    reject('this email is exist');
                }else{
                    bcrypt.hash(password,10).then((hashedPassword)=>{
                        console.log(hashedPassword);
                        let association = new Association({
                            name:name,
                            email:email,
                            password:hashedPassword,
                            phone:phone,
                            postal:postal,
                            docVerif:docVerif,
                        })
                       // console.log(association);
                        association.save().then((association)=>{
                            mongoose.disconnect();
                            resolve(association);

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
        console.log("login association")
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return Association.findOne({ email:email})
        }).then((association)=>{
            if(!association){
                mongoose.disconnect();
                msg = "this email does not exist";
                resolve([msg,"err"])
                reject(msg);
            }else if(association && bcrypt.compare(password, association.password) &&!association.isActive){

                mongoose.disconnect();
                msg = "Please check your email for activation";
                // resolve(message);
                resolve([msg,"err"])
            }else{
                bcrypt.compare(password, association.password).then((same)=>{
                        if(same){
                            //?send token
                            let token = jwt.sign({
                                id:association._id,
                                username:association.name
                            },privateKey,{
                                expiresIn:'1h',
                            })
                            mongoose.disconnect();
                            
                            console.log("same password");
                            
                            resolve([token,"token", association.role]);
                            jwt.decode();
                            //console.log(token);
                            //console.log(jwt.decode());
                            //console.log(jwt.decode().id);
                            //console.log(jwt.decode().username);


                        }else{
                            mongoose.disconnect();
                            msg= 'invalid password'
                            console.log(msg)
                            resolve([msg,"err"])
                            reject(ùsg)
                        }
                }).catch((err)=>{
                    mongoose.disconnect();
                    reject(err);
                })
            }
        })
    })
}




