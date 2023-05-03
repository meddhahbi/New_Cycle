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
        subject:"Confirm your profile",
        html:`<h1>Email Confirmation</h1>
        <h2>Bonjour</h2>
        <p>Pour activer votre compte, veuillez cliquez sur ce lien</p>
        <a href="http://localhost:3000/confirm/${activationCode}">Cliquez ici</a>`,
        //<a href="http://localhost:3000/confirm/${activationCode}">Cliquez ici</a>
    }).catch((err)=>console.log(err));

    
}

module.exports.sendResetPassword = (email,cnt)=>{
    transpoter.sendMail({
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"Password Reset",
        html:`<h1>Password reset link</h1>
        <h2>Hello</h2>
        <p>Click here to reset your password</p>
        ${cnt}`
        
       
    }).catch((err)=>console.log(err));
}


module.exports.sendBlockAvertissement = (email)=>{
    transpoter.sendMail({
        from:process.env.AUTH_EMAIL,
        to:email,
        subject:"Ban Account",
        html:`<h1>Your account now is banned</h1>
        <h2>Hey</h2>
        <p>Due to some suspicious matters we have decided to stop your activities with us.
        Contact this email : userjok9@gmail.com
        </p>`,
        //<a href="http://localhost:3000/confirm/${activationCode}">Cliquez ici</a>
    }).catch((err)=>console.log(err));

    
}