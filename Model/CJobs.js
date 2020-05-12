const mongoose = require('mongoose');
const schema =mongoose.Schema;

const jobsschema=new schema({
    Company: {
        type: schema.Types.ObjectId,
        ref: 'Company'
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

module.exports=CJobs=mongoose.model('CJobs',jobsschema);