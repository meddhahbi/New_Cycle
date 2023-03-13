const express = require('express');
const app = express();
require('dotenv').config();
const userRoute = require('./Routers/UserRoute');
const associationRoute = require('./Routers/AssociationRoute');
var cors = require('cors');
const passport = require("passport");
const { Connect } = require("./config/connect");
//const googleAuth = require("./routes/index");




//const express = require("express");
const session = require("express-session");

//const app = express();

// Set up session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
  })
);

// Your Passport configuration and routes go here

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});





//? reception et envoie de données avec le format json 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors()) // Use this after the variable declaration

Connect();


//* Une méthode de test
/*app.get('/',(req, res, next)=>{
    res.send('New Cycle');
});*/


app.use('/',userRoute);
app.use('/association',associationRoute);


app.use(passport.initialize());
require("./auth/google-auth")(passport);





//*test pour la connection de la base de données
//app.get('/',userRoute);



app.listen(3001, ()=>console.log('server run in port 3001'));