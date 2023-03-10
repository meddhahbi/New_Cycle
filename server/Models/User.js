const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail, sendResetPassword } = require('../Config/nodemailer');

let schemaUser = mongoose.Schema({
    username:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    phone:{ type: Number, required: false },
    postal:{ type: Number, required: false },
    isActive : {type:Boolean,default:false},
    activationCode:String,
    googleId: String,
    secret: String,
    role: { type: String, enum: ['client', 'admin'], default: 'client' }
});

const User = mongoose.model('User', schemaUser);

module.exports = User;



//var User = mongoose.model('User',schemaUser);
var url = process.env.URL;

var privateKey = "this is my secret key testjsdjsbdjdbdjbcjbkajdbqsjq"




//? Send verification email(test only)
// const sendVerificationMail=({_id, email}, res)=>{
//     const currentUrl = "http//localhost:3001";
//     const uniqueString = uuidv4() + _id;

//     const mailOption = {
//         from: process.env.AUTH_EMAIL,
//         to: email,
//         subject: "Verify your account",
//         html: `<p>Verify your email address to complete the signup and signin into your account.</p>
//         <p>This link <b>expires in 6 hours </b>.</p><p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,

//     };

//     const saltRounds = 10;
//     bcrypt.hash(uniqueString,saltRounds)
//         .then((hashUniqueString)=>{
//             const newVerification = new userVerif({
//                 user_id:_id,
//                 uniqueString:uniqueString,
//                 createdAt:Date.now(),
//                 expiredAt:Date.now() + 21600000,
//             });
//             newVerification.save()
//             .then(()=>{
//                 transpoter.sendMail(mailOption)
//                 .then(()=>{
//                     res.json({
//                         status:"PENDING",
//                         message:"Verification email sent ",


//                     });
//                 })
//                 .catch((error)=>{
//                     console.log(error);
//                     res.json({
//                         status:"FAILED",
//                         message:"Verification failed!",
//                     });
//                 })
//             })
//             .catch((error)=>{
//                 console.log(error);
//                 res.json({
//                     status:"FAILED",
//                     message:"Couldn't save verification email data !",
//                 });
//             });
//         })
//         .catch(()=>{
//             res.json({
//                 status:"FAILED",
//                 message:"An error occured while hashing email data !",
//             });
//         })




// };



//? After verif function
// exports.verifMail=(userId,uniqueString)=>{
//     userVerif.find({userId})
//     .then((result)=>{
//         if(result.length > 0){

//             const {expiredAt} = result[0];
//             const hashedUniqueString = result[0].uniqueString;


//             if(expiredAt < Date.now()){
//                 userVerif.deleteOne({userId})
//                 .then(result=>{
//                     User.deleteOne({userId})
//                     .then(()=>{
//                         let msg = "Link has expired. Please Sign up again.";
//                         res.redirect(`/user/verified/error=true&message=${msg}`);
//                     })
//                     .catch(error=>{
//                         console.log(error);
//                         let msg = "Clearing user with expired unique string failed";
//                         res.redirect(`/user/verified/error=true&message=${msg}`);
//                     })
//                 })
//                 .catch((error)=>{
//                     console.log(error);
//                     let msg = "An error occured while clearing expired user verification record";
//                     res.redirect(`/user/verified/error=true&message=${msg}`);
//                 })
//             }else{


//                 bcrypt.compare(uniqueString,hashedUniqueString)
//                 .then((result)=>{
//                     if(result){

//                         User.updateOne({_id : userId}, {verified : true})
//                         .then(()=>{
//                             userVerif.deleteOne({userId})
//                             .then(()=>{
//                                 res.sendFile(path.join(__dirname,"./../Utils/verified.html"));
//                             })
//                             .catch(error=>{
//                                 console.log(error);
//                                 let msg = "An error occured while finalization succesful verification.";
//                                 res.redirect(`/user/verified/error=true&message=${msg}`);
//                             })
//                         })
//                         .catch(error=>{
//                             console.log(error);
//                             let msg = "An error occured while updating user record to show verified.";
//                             res.redirect(`/user/verified/error=true&message=${msg}`);
//                         })

//                     }else{
//                         let msg = "Invalid verification details passed. Check your inbox";
//                         res.redirect(`/user/verified/error=true&message=${msg}`); 
//                     }
//                 })
//                 .catch(error=>{
//                     let msg = "An error occured while comparing unique strings.";
//                     res.redirect(`/user/verified/error=true&message=${msg}`);
//                 })



//             }

//         }else{
//             let msg = "Account record dosen't exist or has been verified already. Please sign up or log in .";
//             res.redirect(`/user/verified/error=true&message=${msg}`);
//         }
//     })
//     .catch((error)=>{
//         console.log(error);
//         let msg = "An error occured while checking for existing user verification record";
//         res.redirect(`/user/verified/error=true&message=${msg}`);
//     })
// }




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
                    const caractere = "123456789abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    let activationCode = "";
                    for (let i=0;i<25;i++){
                        activationCode += caractere[Math.floor(Math.random() * caractere.length)];
                    }
                    bcrypt.hash(password,10).then((hashedPassword)=>{
                        let user = new User({
                            username:username,
                            email:email,
                            password:hashedPassword,
                            phone:phone,
                            postal:postal,
                            activationCode:activationCode,
                            role:role
                        })
                        user.save().then((user)=>{
                            mongoose.disconnect();
                            resolve(user);


                            sendConfirmationEmail(user.email,user.activationCode);
                          //? verification mail method
                            //sendVerificationMail(resolve,res); 





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
                msg = "this email does not exist";
                resolve([msg,"err"])
                reject(msg);
            }else if(user && bcrypt.compare(password, user.password) &&!user.isActive){

                mongoose.disconnect();
                msg = "Please check your email for activation";
                // resolve(message);
                resolve([msg,"err"])
            }else{
                bcrypt.compare(password, user.password).then((same)=>{
                        if(same){
                            //?send token
                            let token = jwt.sign({
                                id:user._id,
                                username:user.username
                            },privateKey,{
                                expiresIn:'1h',
                            })
                            mongoose.disconnect();
                            
                    console.log("same password");
                            resolve([token,"token", user.role])
                            jwt.decode();


                        }else{
                            mongoose.disconnect();
                            msg= 'invalid password'
                            console.log(msg)
                            resolve([msg,"err"])
                            reject(??sg)
                        }
                }).catch((err)=>{
                    mongoose.disconnect();
                    reject(err);
                })
            }
        })
    })
}



exports.verifyUser=(activationCode)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            }).then(()=>{
                return User.findOne({ activationCode:activationCode});
            }).then((user)=>{
                if(!user){
                    mongoose.disconnect();
                    reject("failed");
                }else{
                    user.isActive=true;
                    user.save().then(()=>{
                        mongoose.disconnect();
                        resolve("success");
                    }).catch((err)=>{
                        mongoose.disconnect();
                        reject(err);
                    })
                }
            })
    })
}



//? Email verification (test only)
// exports.verifyUser=(activationCode)=>{
//     return new Promise((resolve, reject)=>{
//         mongoose.connect(url,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }).then(()=>{
//             return User.updateOne({activationCode},{isActive:true});
//         }).then((doc)=>{
//             mongoose.disconnect();
//             resolve(doc);
//         }).catch((err)=>{
//             mongoose.disconnect();
//             reject(err);
//         })
// })
// }

exports.resetPassword=(email)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            const user = User.findOne({ email: email });
            return user.exec().then((doc)=>{  // add .exec() method call here
                if(doc){
                    console.log(doc._id);  // use doc instead of user
                    const cnt = `http://localhost:3000/reset/${doc._id}`;  // use doc instead of user
                    resolve(sendResetPassword(email,cnt));
                    return true;
                }else{
                    mongoose.disconnect();
                    reject('this email does not exist');
                }
            });
        });
    });    
}









exports.updatePassword = async (_id, password) => {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const user = await User.findById(_id);
      if (!user) {
        mongoose.disconnect();
        throw new Error('User not found');
      }
      console.log(_id);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      user.password = hashedPassword;
      const updatedUser = await user.save();
      mongoose.disconnect();
      return updatedUser;
    } catch (err) {
      console.log(err);
      mongoose.disconnect();
      throw new Error('Failed to update password');
    }
    
  };












