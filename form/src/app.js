const express = require("express");
const app = express();
const path = require("path");
const Register = require("./model/registers");
require("./db/conn");
//const staticc= path.join(__dirname,"../public");
//app.use(express.static(staticc));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.get("/",(req,res)=>
{
    res.render("register");
});
app.get("/register",(req,res)=>
{
    res.render("register");
});
app.get("/signin",(req,res)=>
{
    res.render("signin");
});
app.get("/photos.hbs",(req,res)=>
{
    res.render("photos");
});
app.post("/register",async(req,res)=>
{
    try{
       const password= req.body.password;
       const cpassword= req.body.conpassword;
    
    if(password==cpassword)
    {
        const student = new Register({
            name:req.body.name,
            lastname:req.body.lastname,
            designation:req.body.designation,
            email:req.body.email,
            password:req.body.password,
            conpassword:req.body.conpassword
           
            
        })
        const registered= await student.save((err,data)=>
        {
            if(err)
            {
                throw err;
            }
            console.log(data);
                
        });
        res.status(201).render("signin");
        
    }
    else
    {
        res.send("passwords don't match");
    }
}
    catch(err)
    {
        res.status(400).send(error);
    }
   
});
app.post("/signin",async(req,res)=>
{
    try
    {
        const email=req.body.email;
        const password=req.body.password;
       
        const user= await Register.findOne({email:email});
        if(user.password==password)
        {
            if(user.designation=='teacher')
            {
                res.status(201).render("teachers");
            }
            if(user.name=='akriti')
            {
                res.status(201).render("akriti");
            }
            else if(user.name=='shreya')
            {
                res.status(201).render("shreya");
            }
            else if(user.name=='dhruv')
            {
                res.status(201).render("dhruv");
            }
            else 
            {
                res.status(201).render("lorem");
            }
            
        }
        

    }
    catch(error)
    {
        res.status(400).send("invalid email");
    }
});
app.listen(2950,()=>
{
    console.log(`server is running at port `);
});
