const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors = require('cors');
const mongoURI=process.env.MONGODB_URI||'mongodb://kc:kc*12345@ds249873.mlab.com:49873/devzone'

const app=express(); //initializing express

const items=require('./routes/api')   //importing the route file

//connecting to mongo
mongoose.connect(mongoURI,{useNewUrlParser:true})
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.log(err));

app.use(cors());
//applying middleware bodyparser
app.use(bodyParser.json());

//using route
app.use('/api',items); 

const port =process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server running on port: ${port}`))

