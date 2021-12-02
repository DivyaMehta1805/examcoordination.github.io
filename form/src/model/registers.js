const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    conpassword:{
        type:String,
        required:true,
    }
    

  


});
const Register= new mongoose.model("Register",studentSchema);
module.exports=Register;