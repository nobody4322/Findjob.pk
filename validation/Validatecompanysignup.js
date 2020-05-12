const Company=require('../Model/Company')
const emailExistence=require('email-existence')
const bcrypt=require('bcryptjs')
const validatePhoneNumber = require('validate-phone-number-node-js');


module.exports = function validatesignUpInput(companydata) {

    let errors = {};
    
  
        return new Promise((resolve,reject)=>{
            
              if (companydata.Email=="") 
              {
                  errors.email = 'Email field is required';
              }
                else{
                    emailExistence.check(companydata.Email, function(err,res){
                        if(res==true){
                            Company.findOne({Email:companydata.Email})
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
                if(companydata.Fullname=="" )
                {
                     errors.Fullname="Fullname is required"
                }
                if(companydata.Password=="" )
                {
                     errors.Password="Password is required"
                }
                if(companydata.Mobile=="" )
                {
                     errors.Mobile="Mobile num is required"
                }
                else{
                  
                   
                    const result = validatePhoneNumber.validate(companydata.Mobile);
                    if(result==false){
                        errors.Mobile="incorrect number"
                    }
                    
                }
                if(companydata.Company=="" )
                {
                     errors.Company="Company name is required"
                }
                else{


                    Company.findOne({Company:companydata.Company})
                    .then(data=>{
                        if(data){
                            errors.Company="name already exist"
                            
                        }
                            
                
                    })
                    
                  
                   
                    
                    
                }
                setTimeout(()=>{
                 
                  resolve(errors)
                },3000)
                 
            
        })


  };
  

  