const express = require('express');
const connection = require("./db");
const app = express();
require('dotenv').config();
const userRoute = require('./Routers/UserRoute');
const chatRoute = require('./Routers/Chat/ChatRoute');
const messageRoute = require('./Routers/Chat/MessageRoute');
const reportUserRoute = require('./Routers/Report/ReportUserRoute');
const reportUserDetailRoute = require('./Routers/Report/ReportUserDetailRoute');
const associationRoute = require('./Routers/AssociationRoute')
const categoryRoute = require('./Routers/CategoryRoute')
const associationPostRoute = require('./Routers/AssociationPostRoute')
var cors = require('cors');
const passport = require("passport");
const { Connect } = require("./Config/connect");
const Category = require("./Routers/CategoryRoute");
//const googleAuth = require("./routes/index");
const multer = require('multer');

app.use(cors()); // Use this after the variable declaration

const session = require("express-session");
const articleRoutes = require('./Routers/ArticleRoute');
const commentRoutes = require('./Routers/commentRouter');
const produitRoutes = require('./Routers/ProduitRoute');
const AuditLog = require('./Models/AuditLogging');
const wishlistRouter = require('./Routers/wishlistRouter');
const ComparaisonRouter = require('./Routers/ComparaisonRouter');
 
//const app = express();

// Set up session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static('uploads'));



//? reception et envoie de données avec le format json 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

Connect();

//database connection
connection();

// app.use(express.static('public'));


//* Une méthode de test
/*app.get('/',(req, res, next)=>{
    res.send('New Cycle');
});*/


app.use('/',userRoute);
app.use('/association',associationRoute);
app.use('/category',categoryRoute);


app.use(passport.initialize());
require("./auth/google-auth")(passport);

require("./auth/facebook-auth")(passport);

app.use('/article', articleRoutes);
app.use('/comment', commentRoutes);
app.use('/produit', produitRoutes);

app.use('/chat', chatRoute);

app.use('/message', messageRoute);

app.use('/reportUser', reportUserRoute);

app.use('/reportUserDetail', reportUserDetailRoute);

app.use('/association_post', associationPostRoute);
app.use('/wishlist', wishlistRouter)
app.use('/comparison', ComparaisonRouter)

app.use('/category', Category);


// app.use((req, res, next) => {
//   const auditLog = new AuditLog({
//     userId: req.user._id,
//     action: `${req.method} ${req.originalUrl}`,
//     details: JSON.stringify(req.headers)
//   });
  
//   req.user.lastActive = Date.now();
//   req.user.save();
  
//   auditLog.save();
//   next();
// });



//*test pour la connection de la base de données
//app.get('/',userRoute);
app.listen(3001, ()=>console.log('server run in port 3001'));


//app.listen(3001, ()=>console.log('server run in port 3001'));
