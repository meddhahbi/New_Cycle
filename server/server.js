const express = require('express');
const app = express();
require('dotenv').config();
const userRoute = require('./Routers/UserRoute');

//? reception et envoie de données avec le format json 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))




//*une méthode de test
/*app.get('/',(req, res, next)=>{
    res.send('New Cycle');
});*/


app.use('/',userRoute);





//*test pour la connection de la base de données
//app.get('/',userRoute);



app.listen(3001, ()=>console.log('server run in port 3001'));