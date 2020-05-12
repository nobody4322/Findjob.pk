const Jobs=require('../Model/Jobs')

const bcrypt=require('bcryptjs')



module.exports = function validatejobsInput(jobdata) {

    let errors = {};
    
  
        return new Promise((resolve,reject)=>{
           
            
           
              if (jobdata[0].title=="") 
              {
                  console.log("1")
                  errors.title = 'Title field is required';
              }
              if (jobdata[0].company=="") 
              {
                  errors.company = 'Comapany field is required';
              }
              if (jobdata[0].description=="") 
              {
                  errors.description = 'Description field is required';
              }
              if (jobdata[0].discipline=="") 
              {
                  errors.discipline = 'Discipline field is required';
              }
              if (jobdata[0].experience=="") 
              {
                  errors.experience = 'Experience field is required';
              }
              if (jobdata[0].salary=="") 
              {
                  errors.salary = 'salary field is required';
              }
                
                
              setTimeout(()=>{
                  //console.log(errors)
                 
                  resolve(errors)
              },3000)
                 
            
        })


  };
  

  