const User=require('../Model/User')
const bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');

module.exports = function validatefbInput(fbdata) {
    let errors={};
    
    
        return new Promise((resolve,reject)=>{
              
             
                    User.findOne({Email:fbdata.Email})
                    .then(data=>{
                        if(data){
                            if(data.Utype=='s')
                            {
                                errors.Check='using signup, already account exist with this this email'
                                resolve(errors)
                            }
                            else if(data.Utype=='f')
                            {
                                
                                errors.Exist="already made"
                                resolve(errors)
                            }
                            
                        }
                        else{
                            resolve(errors)
                        }
                       
                            
                
                    })
                
               
               
                 
            
        })


  };