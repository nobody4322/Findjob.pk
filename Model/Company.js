const mongoose = require('mongoose');
const schema =mongoose.Schema;

const comapnychema=new schema({
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
        required:true
    },
    Mobile:{
        type:String,
        required:true
    },
    Company:{
        type:String,
        required:true
    },
    History:{
        type:String
    },
    Services:{
        type:Array
    },
    Projects:{
        type:Array
    },
    Adress:{
       type:String
    }
    
 

})

module.exports=Company=mongoose.model('Company',comapnychema);