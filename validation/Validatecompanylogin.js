const Company=require('../Model/Company')
const bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');

module.exports = function validateloginInput(companydata) {
    let errors={};
    let token;
    
        return new Promise((resolve,reject)=>{
              if (companydata.Password=="") {
                errors.Password = 'Password field is required';
              }

              if (companydata.Email=="") {
                errors.Email = 'Email field is required';
              }
              else{
              
                    Company.findOne({Email:companydata.Email})
                    .then(data=>{
                        if(!data){
                            
                          errors.Email="incorrect email"
                            
                        }
                        else{
                            async function checkPassword() {
  
                                let validPassword = await bcrypt.compare(companydata.Password,data.Password)
                                if(validPassword==true){
                                 
                                 
                                   token = jwt.sign({ _id:data._id },'jwtPrivateKey');
                                  
                                  
                                 }
                                 else{
                                    errors.Password="incorrect password"
                                  
                                   
                                 }
                            }
                            if(companydata.Password!=""){
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