const mongoose = require('mongoose');
const schema =mongoose.Schema;

const userchema=new schema({
    Email:{
        type:String,
        required:true,
    },
    Fullname:{
        type:String,
        required:true
    },
    Password:{
        type:String,
       
    },
    Mobile:{
        type:String,
        
    },
    Utype:{
        type:String,
        required:true,
    },
    Company:{
        type:String
    },
    History:{
        type:String
    },
    Education:{
        type:Array
    },
    Experience:{
        type:Array
    },
    Projects:{
        type:Array
    },
    Skills:{
        type:Array
    },
    


})

module.exports=User=mongoose.model('Users',userchema);