 import React, { Component } from 'react';
 import NavBar from './NavBar'
 import '../Styles/home.css'
import axios from "axios";
import Cookies from 'js-cookie'

 

class Home extends Component {

  componentDidMount(){
		axios.get("/user/profileinfo",{headers: {token: Cookies.get('token')}})
		.then(response => {
      //console.log(response)

		})
		.catch(function (error) {
            if (error.response) {
             
              if(error.response.status==401){
                Cookies.remove('token')
                  window.location.href=`/login`
              }
              
            }
      });
    }
    render() {
        return (
            <div>
              <NavBar/>
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

export default Home;