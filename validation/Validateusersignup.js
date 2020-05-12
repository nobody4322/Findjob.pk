const User=require('../Model/User')

const bcrypt=require('bcryptjs')
const emailExistence=require('email-existence')
const validatePhoneNumber = require('validate-phone-number-node-js');


module.exports = function validatesignUpInput(userdata) {

    let errors = {};
    
  
        return new Promise((resolve,reject)=>{
         
            

              if (userdata.Email=="") 
              {
                  errors.email = 'Email field is required';
              }
                else{
                    emailExistence.check(userdata.Email, function(err,res){
                        if(res==true){
                            User.findOne({Email:userdata.Email})
                            .then(data=>{
                                if(data){
                                    errors.email="email already exist"
                                    
                                }
                                    
                        
                            })

                        }
                        else if(res==false){
                            errors.email = 'incorret email';

                        }
                        
                    });
                    
                   
                }
                if(userdata.Fullname=="" )
                {
                     errors.Fullname="Fullname is required"
                }
                if(userdata.Password=="" )
                {
                     errors.Password="Password is required"
                }
                if(userdata.Mobile=="" )
                {
                     errors.Mobile="Mobile num is required"
                }
                else{
                  
                   
                    const result = validatePhoneNumber.validate(userdata.Mobile);
                    if(result==false){
                        errors.Mobile="incorrect number"
                    }
                    
                }
                setTimeout(()=>{
                 
                  resolve(errors)
                },3000)
                 
            
        })


  };
  

  