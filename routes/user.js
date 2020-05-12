const User=require('../Model/User')
const Jobs=require('../Model/Jobs')
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const validatesignUpInput=require('../validation/Validateusersignup')
const validateloginInput=require('../validation/Validateuserlogin')
const validatefbInput=require('../validation/Validatefb')
const validatejobInput=require('../validation/validatejobs')
const sendEmail=require('./email')
var jwt = require('jsonwebtoken');
const auth=require('../validation/auth')



function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}


router.post('/signup',(req,res)=>{
  const user=new User({
        
    Email:req.body.email,
    Fullname:req.body.fullname,
    Password:req.body.password,
    Mobile:req.body.mobile,
    Utype:'s'

    
    })
    
    let errors;
    async function validate(){
       errors= await validatesignUpInput(user)  
       const salt=await bcrypt.genSalt(10);
       user.Password=await bcrypt.hash(user.Password,salt)
       
    }
    validate().then(()=>{

      if(isEmpty(errors)) {

       
         user.save()
        .then(()=>{   
         
         res.send({
              message:'added'
          })
        })
        .catch((err)=>{
          res.send({
            message:'not added'
          })
         
        })
    
      }
      else{
        res.send({
          message:'not added',
          errors:errors
        })
      }
    })
   
    
   
});
router.post('/fb',(req,res)=>{
  
  const user=new User({
        
    Email:req.body.email,
    Fullname:req.body.name,
    Password:"kamran123",

    Utype:'f'

    
  })
  let data,token;
  async function validate(){
       data= await validatefbInput(user)  
       const salt=await bcrypt.genSalt(10);
       user.Password=await bcrypt.hash(user.Password,salt)
      
      
  }
  validate().then(()=>{
     
      
      if(isEmpty(data))
      {
           
            user.save();
           
            token = jwt.sign({ _id:data._id },'jwtPrivateKey');
            res.send({
                token:token
            }) 
            
            
      }
      else{
        
        
        if(data.Exist)
        {
          User.findOne({Email:user.Email})
          .then(data=>{
            if(data){
              token = jwt.sign({ _id:data._id },'jwtPrivateKey');
              res.send({
                token:token
              }) 
            }
          })

        }
        else{
          res.send({
            errors:data
          })

        }
        
       
      }
      
    })
     
});
router.post('/login',(req,res)=>{  
  
  


  const user=new User({
      
    Email:req.body.email,
    Password:req.body.password
    
    })
    let data;
    async function validate(){
       data= await validateloginInput(user)  
      
    }
    validate().then(()=>{
      
      if(!isEmpty(data[0])) {
        res.send({
          errors:data[0]
        })    

      }
      else{
        
        res.send({
          token:data[1]
        }) 
        
      }
      
    })
    

});
router.post('/authenticate',(req,res)=>{  
  
  try{
    var decoded = jwt.verify(req.body.token, 'jwtPrivateKey');
    console.log(decoded._id)
    res.send({
      check:true
    })
    
   
    
  }
catch{
  
    res.status(400).send('invalid token')
   
   
   }

  

});
router.get('/profileinfo',auth,(req,res)=>{  
  const userId=res.userId
  
   
  User.findOne({_id:userId})
  .then(data=>{
      if(data){ 
        res.send({
          email:data.Email,
          name:data.Fullname,
          phone:data.Mobile,
          company:data.Company,
          history:data.History,
          education:data.Education,
          experience:data.Experience,
          projects:data.Projects,
          skills:data.Skills
        }) 


      }
      else{
        res.status(400).send('');
      }
    
   });
  
  
   
 
});

router.post('/updateprofile',auth,(req,res)=>{  
  const userId=res.userId
  
   
  User.updateOne({_id:userId},{ Company:req.body.company,History:req.body.history,Education:req.body.education,Experience:req.body.experience,Projects:req.body.projects,Skills:req.body.skills})
  .then(
    res.status(200).send("save")
  )
  .catch((err)=>{
   res.status(400).send()
   
  })
  
      
      

   
    
  
  
   
 
});

router.post('/postjob',auth,(req,res)=>{ 
  const userId=res.userId 

  const jobs=new Jobs({
    User:userId,
    Jobs:[
      {
        title:req.body.title,
        company:req.body.company,
        description:req.body.description,
        discipline:req.body.discipline,
        experience:req.body.experience,
        salary:req.body.salary,
      }
    ]
    
    })
    const newjob={
      title:req.body.title,
      company:req.body.company,
      description:req.body.description,
      discipline:req.body.discipline,
      experience:req.body.experience,
      salary:req.body.salary,
    }
    let errors
     
    async function validate(){
      errors= await validatejobInput(jobs.Jobs)  
    }
    validate().then(()=>{
     
     
      if(isEmpty(errors))
      {
        
        
         Jobs.findOne({User:userId})
         .then(data=>{
           if(data){
             
           
            data.Jobs.push(newjob)
            data.save()
            .then(
              res.send("ok")

              
            )
            
           
      
            
            
           }
           else{
            jobs.save()
            .then(()=>{   
             
             res.send({
                  message:'added'
              })
            })
            .catch((err)=>{
              res.send({
                message:'not added'
              })
             
            })
      
           }

         })
       


      }
      else{
        res.send({
          message:'not added',
          errors:errors
        })
      }
    })
  

   
 
  
   
 
});

router.get('/getjobs',auth,(req,res)=>{  
  const userId=res.userId
  
   
  Jobs.findOne({User:userId})
  .then(data=>{
      if(data){ 
        res.send({
          jobs:data.Jobs
        }) 


      }
      else{
        res.status(400).send('');
      }
    
   });
  
  
   
 
});


router.post('/editjob',auth,(req,res)=>{ 
  const userId=res.userId;
  const index=req.body.index;
  

  const jobs=new Jobs({
    User:userId,
    Jobs:[
      {
        title:req.body.title,
        company:req.body.company,
        description:req.body.description,
        discipline:req.body.discipline,
        experience:req.body.experience,
        salary:req.body.salary,
      }
    ]
    
    })
    const newjob={
      title:req.body.title,
      company:req.body.company,
      description:req.body.description,
      discipline:req.body.discipline,
      experience:req.body.experience,
      salary:req.body.salary,
      
    }
    let errors
     
    async function validate(){
      errors= await validatejobInput(jobs.Jobs)  
    }
    validate().then(()=>{
     
     
      if(isEmpty(errors))
      {
        
        
         Jobs.findOne({User:userId})
         .then(data=>{
           if(data){
             
           
            data.Jobs.splice(index,1,newjob)
            data.save()
            .then(
              res.send("ok")

              
            )
            
           
      
            
            
           }
           else{
             res.status(400).send()
            
      
           }

         })
       


      }
      else{
        res.send({
          message:'not added',
          errors:errors
        })
      }
    })
  

   
 
  
   
 
});



router.post('/deletejob',auth,(req,res)=>{ 
  const userId=res.userId;
  const index=req.body.index;
  const jobid=req.body.jobid
  let updateresponse=[]
  let len;
  
         Jobs.findOne({User:userId})
         .then(data=>{
           if(data){
             
            data.Jobs.splice(index,1)
            data.save()
            .then(
              len=data.Response.length,
                data.Response.map((item,index)=>{
                  if(item.JobId!=jobid){
                    updateresponse.push(item)
                  }
                  if(len==index+1){
                    Jobs.updateOne({User:userId},{Response:updateresponse})
                    .then(
                      res.send({
                        job:data.Jobs
                        
                      })
                      
                    )
                  }
                })
            
            )
            

           }
           else{
             res.status(400).send()
            
      
           }
         })


});

router.get('/findall',auth,(req,res)=>{ 
  let jobdata;
  const userId=res.userId;
  Jobs.find({User:{$ne:userId}}).then(function (users) {

     checkstatus(users,userId).then(function(users){
      res.send({
        users:users
      })
     })
     
     
      
    })
  
       
        


});
function checkstatus(users,UserId) {
  
  return new Promise(function(resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    users.map(data=>{
      data.Response.map(data1=>{
        if(data1.UserId==UserId){
          
         
          data.Jobs.map(data2=>{
            
            if(data2._id.equals(data1.JobId))
            {
              
              data2.Status=true
            }
          })
          
        }
        
      })
    })
    
    setTimeout(function() {
     // console.log(users[0].Jobs)
      resolve(users); // After 3 seconds, resolve the promise with value 42
    }, 3000);
  });
}

router.post('/response',auth,(req,res)=>{ 
  const response={
    UserId:res.userId,
    JobId:req.body.jobId

  }
  const userId=req.body.userId;
  
  
         Jobs.findOne({User:userId})
         .then(data=>{
           if(data){
             
            data.Response.push(response)
            data.save()
            .then(
              res.send("ok"))
            

           }
           else{
             res.status(400).send()
            
      
           }
         })


});
function findname(response,jobId) {
  let name=[]
  
  return new Promise(function(resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    response.map(data=>{
    
        if(data.JobId==jobId){
            User.findOne({_id:data.UserId})
            .then(data=>{
              const data1={
                Fullname:data.Fullname,
                id:data._id
              }
              name.push(data1)
              
            
            }) 
        }
        
      })
    
    
    setTimeout(function() {
     // console.log(users[0].Jobs)
    
      resolve(name); // After 3 seconds, resolve the promise with value 42
    }, 3000);
  });
}

router.post('/findapplicantname',auth,(req,res)=>{ 
  
  const userId=res.userId;
  const JobId=req.body.jobid;


        Jobs.findOne({User:userId})
   
        .then(data=>{
          if(data){
            
            findname(data.Response,JobId).then(function(name){
             res.send({
               name:name
             })
            })
           

          }
          else{
            res.status(400).send()
           
     
          }
        })


});

router.post('/findapplicantdetail',auth,(req,res)=>{ 
  
  const userId=res.userId;
  const applicant=req.body.userid;


        User.findOne({_id:applicant})
   
        .then(data=>{
          if(data){
            
             
             res.send({
               profile:data
             })
            
           

          }
          else{
            res.status(400).send()
           
     
          }
        })


});
router.post('/send',auth,(req,res)=>{ 
  
  const userId=res.userId;
  const applicantid=req.body.userid
 


        User.findOne({_id:applicantid})
   
        .then(data=>{
          if(data){
            
            sendEmail(data.Email,req.body.subject,req.body.msg).then(a=>{
              if(a==true){
                res.send({
                  check:true
               })

              }
              else if(a==false){
                res.send({
                  check:false
               })
              }
             
            })
            
            
           

          }
          else{
            res.status(400).send()
           
     
          }
        })


});





module.exports=router