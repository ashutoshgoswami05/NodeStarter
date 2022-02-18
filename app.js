const dotenv=require("dotenv")
const express= require('express')

const app=express();

dotenv.congif({path:"./config.env"})

require("./DB/conn");
const PORT=process.env.PORT;


app.use(express.json());


const middleware= (req,res,next)=>{
    console.log("hello")
    next();
    
 }


// const User = require('./model/userSchema')
app.use((require('./router/auth')));

    
app.get('/about',middleware,(req,res)=>{
    res.send("Hello word")
})

app.get('/contact',(req,res)=>{
    res.send("Hello contact")
})

app.get('/signin',(req,res)=>{
    res.send("Hello contact")
})

app.get('/signup',(req,res)=>{
    res.send("Hello contact")
})



app.listen(PORT,()=>{
    console.log('server is running')
})