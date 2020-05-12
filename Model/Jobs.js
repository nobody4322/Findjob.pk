const mongoose = require('mongoose');
const schema =mongoose.Schema;

const jobsschema=new schema({
    User: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    Jobs:[
        {
            title:{
                type:String,
               
            },
            company:{
                    type:String,
                    
            },
            description:{
                    type:String,
            },
            discipline:{
                    type:String,

            },
            experience:{
                type:String,

            },
            salary:{
                type:String,
            },
            Status:{
                type:Boolean,
                default:false,
            }

                

        }
    ],
    Response:[
        {
            JobId:{
                
                type: schema.Types.ObjectId,
            },
            UserId:{
                type: schema.Types.ObjectId,
            },
           

        }
    ]
         
   


})

module.exports=User=mongoose.model('Jobs',jobsschema);