import React, { Component } from 'react';
import CNavBar from './CNavBar';
import '../Styles/profile.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import Cookies from 'js-cookie'



class CProfile extends Component {

	constructor(props){
		super(props)
		this.state={
		  email:'',
		  name:'',
		  phone:'',
		  company:'',
		  history:'',
		  services:[],
		  projects:[],
		  adress:''
		}
	  }
	componentDidMount(){
		axios.get("/company/profileinfo",{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
			
			this.setState({
				name:response.data.name,
				email:response.data.email,
				phone:response.data.phone,
				company:response.data.company,
				history:response.data.history,
				services:response.data.services,
				projects:response.data.projects,
				adress:response.data.adress
				

			})

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
            <div  >
                <CNavBar/>
               
                     <div class="pic">
                        <img  class=" rounded-circle profile-image" src={require("./img/profile.png")}/>
						<h3 class="change">{this.state.name}</h3>
						<h3 class="change">{this.state.email}</h3>
						<h3 class="change">{this.state.phone}</h3>
                        <div class="change" ><i className="fas fa-map-marker-alt"></i>  Lahore, Pakistan</div>
                     </div>
                     <div className="container">
						 <div className="container-fluid cont">
							<div className="row">
								<div className="col-lg-6 left-box">
									<div className="con">
										<div className="title">Company</div>
										<div className="bar"> </div>
										<h2 className="discrip-text">{this.state.company}</h2>
									</div>
								</div>
								<div className="col-lg-5 right-box">
								    <div className="con">
										<div className="title">Professional History</div>
										<div className="bar"> </div>
										<div className="discrip-text">{this.state.history}  </div>
									</div> 
									
								</div>
								
							</div>
						</div>
						
						<div class="container-fluid">
							<div class="row">
								<div class="rounded-rectangle">
									<div class="con">
										<div class="title">Services</div>
										<div class="bar"> </div>
										<h3 className="discrip-text">{this.state.services[0]} </h3>
										<h3 className="discrip-text">{this.state.services[1]} </h3>
										
									</div>
								</div>
							</div>
		               </div>
					   
					    <div class="container-fluid">
							<div class="row">
								<div class="rounded-rectangle">
									<div class="con">
                                        <div class="title">Projects</div>
                                        <div class="bar"> </div>
										<h3 className="discrip-text">{this.state.projects[0]}</h3>
										<h3 className="discrip-text">{this.state.projects[1]}</h3>
										
									</div>
								</div>
							</div>
						</div>
						<div class="container-fluid">
						<div class="row">
							<div class="rounded-rectangle">
								<div class="con">
									<div class="title">Adress</div>
									<div class="bar"> </div>
									<div className="discrip-text">{this.state.adress}</div>
									
								</div>
							</div>
						</div>
					</div>
						
                    </div>
					
                    
                     
                        
       
            </div>
        );
    }
}

export default CProfile;