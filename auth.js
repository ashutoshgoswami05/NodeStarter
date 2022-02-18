const express= require('express')
const router=express.Router();


const User=require("../model/userSchema")    
    
    
router.get('/',(req,res)=>{
     res.send("Hello word")
})


router.post('/register',(req,res)=>{
  const {name, email ,phone} =req.body;
  if( !name || !email || !phone)  
     return res.status(422).json({error:"enter the correct details"})   

 console.log(name);
 res.json({message:req.body});

 User.findOne({email:email}).then((userExists)=>{
      if(userExists)
     return res.status(422).json({error:"Email already exists"})   

     const user= new User({name, email ,phone})

     user.save().then(()=>{
          res.status(201).json({message:"Success stores"}).catch((err)=>{
               res.status(500).json({error:"Failed registered"})
          })
     })


 
}).catch((err)=>console.log(err))
})
 module.exports=router