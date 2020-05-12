const User=require('../Model/User')

const bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');

module.exports = function validateloginInput(userdata) {
    let errors={};
    let token;
    
    
  
        return new Promise((resolve,reject)=>{
              if (userdata.Password=="") {
                errors.Password = 'Password field is required';
              }

              if (userdata.Email=="") {
                errors.Email = 'Email field is required';
              }
              else{
              
                    User.findOne({Email:userdata.Email})
                    .then(data=>{
                        if(!data){

                        
                          errors.Email="incorrect email"
                            
                        }
                        else{
                            async function checkPassword() {
  
                                let validPassword = await bcrypt.compare(userdata.Password,data.Password)
                                if(validPassword==true){
                                 
                                 
                                   token = jwt.sign({ _id:data._id },'jwtPrivateKey');
                                  
                                 }
                                 else{
                                    errors.Password="incorrect password"
                                  
                                   
                                 }
                            }
                            if(userdata.Password!=""){
                                checkPassword()
                            }
                            
                        }
                            
                
                    })
                }
               
                setTimeout(()=>{
                  
            
                  resolve([errors,token])
                },3000)
                 
            
        })


  };