const express = require("express");
const router = new express.Router();
const users = require("../models/userSchema");


// router.get('/',(req,res)=>{
//     console.log('connect');
// })




//register user

router.post('/register',async(req,res)=>{
   // console.log(req.body);


   if(!req.body){
    res.status(422).json("data is not filled");
    return;
   }


   const{name,email,number,nic,address}=req.body;
   if(!name || !email || !number || !nic || !address){
    res.status(422).json("plz fill the data");
    return;
}
   

   try{

    const preuser = await users.findOne({email:email});
    //console.log(preuser);

    if(preuser){
        res.status(404).json("this user is already present");
    }else{
        const adduser = new users({
            name,email,number,nic,address
        });

        await adduser.save();
        res.status(201).json(adduser);
        //console.log(adduser);
    }


   }catch(err){
    res.status(422).json(err);
   }

})
     




//get userdata



router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        //console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})



// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        //console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        //console.log(userindividual);
        res.status(201).json(userindividual);

    } catch (error) {
        res.status(422).json(error);
    }
})



// update user data

router.patch("/updateuser/:id",async(req,res)=>{

    const{name,email,number,nic,address}=req.body;
    if(!name || !email || !number || !nic || !address){
     res.status(422).json("plz fill the data");
     return;
 }

        
 function isValiEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
    res.status(400).json("plz add valid email");
    return;
    }
  }

  isValiEmail(email);




    try {


  


        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        // console.log(updateduser);
        
        


        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        //console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;