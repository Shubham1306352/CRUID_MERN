const dotenv=require('dotenv');
const express =require('express');
const app=express();
const mongoose=require('mongoose');
const users=require('./models/userSchema');
const cors=require('cors');
const router=require('./routes/router');




const port =8003;


app.use(cors());
app.use(express.json());
app.use(router);



dotenv.config({path:'config.env'});
const connectDB = require('./config/db');
connectDB();



app.listen(port,()=>{
    console.log(`Server is started at port number : ${port}`);
});
