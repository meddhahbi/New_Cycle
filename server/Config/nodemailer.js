const nodemailer = require('nodemailer');


const transpoter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASS
    },
});

module.exports.sendConfirmationEmail = (email,activationCode)=>{
    transpoter.sendMail({
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"Confirmer votre compte",
        html:`<h1>Confirmation Email</h1>
        <h2>Bonjour</h2>
        <p>Pour activer votre compte, veuillez cliquez sur ce lien</p>
        <a href="http://localhost:3000/confirm/${activationCode}">Cliquez ici</a>`,
        //<a href="http://localhost:3000/confirm/${activationCode}">Cliquez ici</a>
    }).catch((err)=>console.log(err));
}