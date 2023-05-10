const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendConfirmationEmail, sendResetPassword, sendBlockAvertissement } = require('../Config/nodemailer');
const moment = require('moment');
const { resolve } = require('path');
//const stripe = require('../Config/stripe.js')

let schemaUser = mongoose.Schema({
    username:{ type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    phone:{ type: Number, required: false },
    postal:{ type: Number, required: false },
    isActive : {type:Boolean,default:false},
    isOnline : {type:Boolean,default:false},
    isReported : {type:Boolean,default:false},
    activationCode:String,
    googleId: String,
    secret: String,
    isBlocked:{type:Boolean,default:false},
    subscription: {
        plan: {type:String,default:'premium'}, 
        status: {type:Boolean,default:false}, 
        start: {type:Date,default:null}, 
        end: {type:Date,default:null}, 
        nextPayment: {type:Date,default:null}, 
    },
    image:{type:String, default:"default.jpg"},
    lastActive: { type: Date, default: Date.now },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
      }],
    role: { type: String, enum: ['client', 'admin'], default: 'client' }

});

// const User = mongoose.model('User', schemaUser);
var User = mongoose.model('User',schemaUser);


//var User = mongoose.model('User',schemaUser);
var url = process.env.URL;

var privateKey = "this is my secret key testjsdjsbdjdbdjbcjbkajdbqsjq"
//var privateKey = process.env.PK



register=(username,email,password,phone,postal,image,role)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return User.findOne({
                email:email
            }).then((doc)=>{
                if(doc){
                   // mongoose.disconnect();
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
                            image:image.split("uploads\\")[1],
                            role:role
                        })
                        user.save().then((user)=>{
                           // mongoose.disconnect();
                            resolve(user);


                            sendConfirmationEmail(user.email,user.activationCode);
                          //? verification mail method
                            //sendVerificationMail(resolve,res); 





                        }).catch((err)=>{
                           // mongoose.disconnect();
                            reject(err);
                        })
                    }).catch((err)=>{
                       // mongoose.disconnect();
                        reject(err)
                    })
                }
            })
        })
    })
}

currentUser=async(email)=>{
    try{
        return User.findOne({ email:email})
        .then((user)=>{
            return user
        })
        .catch((err)=>res.status(400).json({error:err}));
    }
    catch(err){
        console.log(err.message);
    }
}
updateProfile=(user_email, username, phone, postal)=>{
    try{
        console.log("trying")
        return User.findOne({ email:user_email})
            .then(async(user)=>{
                console.log(user.username)
                if ((user.username !== username||user.phone!==phone||user.postal!==postal) && username && postal && phone)
                {
                    user.username = username;
                    user.phone = phone;
                    user.postal = postal;
                }
                return await user.save()
            })
            .catch((err)=>res.status(400).json({error:err}));
    }
    catch(err){
        console.log(err.message);
    }
}

login=(email,password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return User.findOne({ email:email})
        }).then(async(user)=>{

            if(user){
                bcrypt.compare(password, user.password).then((same)=>{
                    if(same){
                        
                        if(!user.isActive){
                            // mongoose.disconnect();
                            msg = "Please check your email for activation";
                            // resolve(message);
                            resolve([msg,"err"])
                        }else if(user.isBlocked){
                            // mongoose.disconnect();
                            msg = "Your account has been blocked";
                            // resolve(message);
                            resolve([msg,"err"])
                        }
                        //?send token
                        let token = jwt.sign({
                            id:user._id
                        },privateKey,{
                            expiresIn:'30d',
                        })
                        
                        // mongoose.disconnect();
                        
                        console.log("same password");
                        jwt.decode();
                        user.isOnline = true
                        user.save()
                        resolve([token,"token", user.role, user.email, user]);


                    }else{
                        // mongoose.disconnect();
                        msg= 'invalid password'
                        resolve([msg,"err"])
                        reject(msg)
                    }
                }).catch((err)=>{
                    // mongoose.disconnect();
                    reject(err);
                })
            }else{
                // mongoose.disconnect();
                const msg = "this email does not exist";
                resolve([msg,"err"])
            }
        })
    })
}


verifyUser=(activationCode)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
            }).then(()=>{
                return User.findOne({ activationCode:activationCode});
            }).then((user)=>{
                if(!user){
                   // mongoose.disconnect();
                    reject("failed");
                }else{
                    user.isActive=true;
                    user.save().then(()=>{
                       // mongoose.disconnect();
                        resolve("success");
                    }).catch((err)=>{
                       // mongoose.disconnect();
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
                    //mongoose.disconnect();
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
        //mongoose.disconnect();
        throw new Error('User not found');
      }
      console.log(_id);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      user.password = hashedPassword;
      const updatedUser = await user.save();
      //mongoose.disconnect();
      return updatedUser;
    } catch (err) {
      console.log(err);
      //mongoose.disconnect();
      throw new Error('Failed to update password');
    }
    
};


// exports.verifDocAndChangeStatus=(_id)=>{
    
// }


createSubs=(email)=>{
    return new Promise((resolve,reject)=>{
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return User.findOne({email: email
            }).then((doc)=>{
                if(doc){

                    // const subs = stripe.subscriptions.create({
                    //     customer: stripeCustomerId,
                    //     items: [{
                    //       plan: 'your_plan_id',
                    //     }],
                    //   });



                    const subscription = {
                        status: true,
                        start: moment(),
                        end: moment().add(30, 'days'), 
                        nextPayment: moment().add(30, 'days'),
                    };
                
                    User.updateOne({email: email}, {
                        $set: {
                        subscription,
                        //stripeCustomerId
                        }
                        
                    }).then((user)=>{
                      //  mongoose.disconnect();
                        resolve(user);

                    }).catch((err)=>{
                      //  mongoose.disconnect();
                        reject(err);
                    });
                
                }else{
                   // mongoose.disconnect();
                    reject('this email is exist');
                }
            })

        });
    })

}

verifySubscription=(email)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            return User.findOne({email: email});
        }).then((user)=>{
          resolve(user.subscription);
        }).catch((err)=>{
            reject(err);
        })
    }).catch((err)=>{
        reject(err);
    })
}



getAllUsers=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{

            return User.find({ role: 'client', isBlocked:false });

        }).then((doc)=>{
            resolve(doc);
        }).catch((err)=>{
            reject(err);
        })
    })
}


getAllUsersBlocked=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{

            return User.find({ role: 'client', isBlocked:true });

        }).then((doc)=>{
            resolve(doc);
        }).catch((err)=>{
            reject(err);
        })
    })
}


getAllUsersCount = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        return User.countDocuments();
      }).then((count) => {
        resolve(count);
      }).catch((err) => {
        reject(err);
      })
    })
  }


  getAllUsersNotActiveCount = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        return User.countDocuments({ role: 'client', isActive:false });
      }).then((count) => {
        resolve(count);
      }).catch((err) => {
        reject(err);
      })
    })
  }


  getAllUsersReportedCount = () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        return User.countDocuments({ isReported:true });
      }).then((count) => {
        resolve(count);
      }).catch((err) => {
        reject(err);
      })
    })
  }





// exports.getPrices=()=>{
//     const prices = stripe.prices.list({
//         apiKey:process.env.STRIPE_SECRET_KEY,
//     });

// }




//   exports.blockUser=(userId)=>{
//     try {
//         const user =  User.findById(userId);
//         if (!user) {
//           throw new Error('User not found');
//         }
//         user.isBlocked = true;
//          user.save();
//         console.log(`User with ID ${userId} has been blocked`);
//       } catch (err) {
//         console.error(`Error blocking user with ID ${userId}: ${err.message}`);
//       }
// }



const block = async (_id) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const user = await User.findById(_id);

        if (!user) {
            throw new Error('User not found');
        }

        console.log(_id);
        user.isBlocked = true;
        const updatedUser = await user.save();

       // mongoose.disconnect();
       sendBlockAvertissement(user.email);
        return updatedUser;
    } catch (err) {
        console.log(err);
        //mongoose.disconnect();
        throw new Error('Failed to block user');
    }
};



const unblock = async (_id) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const user = await User.findById(_id);

        if (!user) {
            throw new Error('User not found');
        }

        console.log(_id);
        user.isBlocked = false;
        const updatedUser = await user.save();

       // mongoose.disconnect();

        return updatedUser;
    } catch (err) {
        console.log(err);
        //mongoose.disconnect();
        throw new Error('Failed to unblock user');
    }
};



deleteUser = (id) =>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            User.findByIdAndDelete(id)
            .then(() => {
           //     mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
         //       mongoose.disconnect();
                reject({ message: "Failed to delete user from database", error: err });
            });
        })
        .catch((err) => {
        //    mongoose.disconnect();
            reject({ message: "Failed to connect to database", error: err });
        });
    });
}






getUserById = (id) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          User.findById(id)
            .then((User) => {
            //  mongoose.disconnect();
              resolve(User);
            })
            .catch((err) => {
           //   mongoose.disconnect();
              reject({ message: "Failed to retrieve product from database", error: err });
            });
        })
        .catch((err) => {
        //  mongoose.disconnect();
          reject({ message: "Failed to connect to database", error: err });
        });
    });
  };


module.exports = {
    User,
    login,
    currentUser,
    register,
    createSubs,
    verifyUser,
    updateProfile,
    block,
    verifySubscription,
    getAllUsers,
    getAllUsersCount,
    deleteUser,
    getAllUsersBlocked,
    unblock,
    getAllUsersNotActiveCount,
    getUserById,
    getAllUsersReportedCount,

};

