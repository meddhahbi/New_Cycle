const route = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const pdfparse = require('pdf-parse');




let schemaAssociation = mongoose.Schema({
    name:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{ type: Number, required: true },
    postal:{ type: Number, required: true },
    isActive : {type:Boolean,default:false},
    docVerif:{type:String},
    role: { type: String,  default: 'association' }
});

var Association = mongoose.model('Association',schemaAssociation);
var url = process.env.URL;


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage })


var privateKey = "this is my secret key testjsdjsbdjdbdjbcjbkajdbqsjq"





register=(name,email,password,phone,postal,docVerif)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return Association.findOne({
                email:email
            }).then((doc)=>{
                if(doc){
                   // mongoose.disconnect();
                    reject('this email is exist');
                }else{
                    bcrypt.hash(password,10).then((hashedPassword)=>{
                        let association = new Association({
                            name:name,
                            email:email,
                            password:hashedPassword,
                            phone:phone,
                            postal:postal,
                            docVerif:docVerif,
                        })
                        association.save().then((association)=>{
                           // mongoose.disconnect();
                            resolve(association);

                        }).catch((err)=>{
                           // mongoose.disconnect();
                            reject(err);
            
                        })
                    }).catch((err)=>{
                       // mongoose.disconnect();
                        reject(err);
                    })
                }
            })
        })
    })
}


login=(email,password)=>{

    return new Promise((resolve, reject)=>{
        console.log("login association")
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return Association.findOne({ email:email})
        }).then((association)=>{
            if(!association){
               // mongoose.disconnect();
                msg = "this email does not exist";
                resolve([msg,"err"])
                // reject(msg);
            }else if(association && bcrypt.compare(password, association.password) &&!association.isActive){

               // mongoose.disconnect();
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
                           // mongoose.disconnect();
                            
                            console.log("same password");
                            
                            resolve([token,"token", association.role]);
                            jwt.decode();
                            //console.log(token);
                            //console.log(jwt.decode());
                            //console.log(jwt.decode().id);
                            //console.log(jwt.decode().username);


                        }else{
                           // mongoose.disconnect();
                            msg= 'invalid password'
                            console.log(msg)
                            resolve([msg,"err"])
                            reject(ùsg)
                        }
                }).catch((err)=>{
                   // mongoose.disconnect();
                    reject(err);
                })
            }
        })
    })
}

// verifDoc=(email)=>{
//     return new Promise((resolve, reject)=>{
//         mongoose.connect(url,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }).then(()=>{
//             return Association.findOne({ email:email})
//         }).then((association)=>{
//             if(!association){
//                 // mongoose.disconnect();
//                  msg = "this email does not exist";
//                  resolve([msg,"err"])
//                  // reject(msg);
//              }else{

//                 const pdffile = fs.readFileSync(association.docVerif);
//                 pdfparse(pdffile).then((data)=>{
//                     console.log(data.numpages);
//                 })
//                // const nom =  association.docVerif.name;
//                 resolve(pdffile);

//              }
//         }).catch((err)=>{
//             // mongoose.disconnect();
//              reject(err);

//          })
//     }).catch((err)=>{
//         // mongoose.disconnect();
//          reject(err);
//      })
// }


verifDoc = (email) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            return Association.findOne({
                email: email
            })
        }).then((association) => {
            if (!association) {
                // mongoose.disconnect();
                const msg = "this email does not exist";
                resolve([msg, "err"])
                // reject(msg);
            } else {

                const pdffile = fs.readFileSync(association.docVerif);
                pdfparse(pdffile).then((data) => {
                    // console.log(data.numpages);
                    console.log(data.text);
                    if(data.text.includes('Document')){
                        association.isActive = true;
                         association.save();
                         console.log('verified')
                    }else{
                        console.log('Not verified')
                    }

                })
                // const nom =  association.docVerif.name;
                resolve(pdffile);

            }
        }).catch((err) => {
            // mongoose.disconnect();
            reject(err);
        })
    })
}

getStatus=(email)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return Association.findOne({email: email});
        }).then((association)=>{
          resolve(association.isActive);
        }).catch((err)=>{
            reject(err);
        })
    }).catch((err)=>{
        reject(err);
    })
}






module.exports = {
    Association,
   login,
   register,
   verifDoc,
   getStatus,
};