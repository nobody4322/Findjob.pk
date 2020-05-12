import React, { Component } from 'react';
import CNavBar from './CNavBar'
import '../Styles/home.css'
import axios from "axios";
import Cookies from 'js-cookie'


class CHome extends Component {
  componentDidMount(){
		axios.get("/company/profileinfo",{headers: {token: Cookies.get('adtoken')}})
		.then(response => {

		})
		.catch(function (error) {
			if (error.response) {
			 
			  if(error.response.status==401){
				Cookies.remove('adtoken')
				  window.location.href=`/Clogin`
			  }
			  
			}
		});
	}
   render() {
       return (
           <div>
             <CNavBar/>
             <div class="container">
             <div class="white-box1">
             <div class="row approval-card d-flex justify-content-center">
                       
             <div class="col-lg-4">
             <img class="logo" src={require("./img/findjob.png")}/>
            
                
             </div>

                    

              </div>
              <div class="row approval-card d-flex justify-content-center">
                       
             <div class="col-lg-4">
             <p>FindJob.PK is providing latest Jobs in Pakistan. Register with FindJob.PK and Apply for latest Jobs in Pakistan. </p>
            
                
             </div>
             
                    

              </div>
                 
            
            
            
            </div>
 
     
         
         </div>
         </div>

     
               
          
       );
   }
}

export default CHome;