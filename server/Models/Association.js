
const mongoose = require('mongoose');



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
                        let association = new Association({
                            name:name,
                            email:email,
                            password:hashedPassword,
                            phone:phone,
                            postal:postal,
                            docVerif:docVerif,
                        })
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
