import React, { Component } from 'react';
import NavBar from './NavBar';
import '../Styles/profile.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import Cookies from 'js-cookie'



class Profile extends Component {
	constructor(props){
		super(props)
		this.state={
		  email:'',
		  name:'',
		  phone:'',
		  company:'',
		  history:'',
		  education:[],
		  experience:[],
		  projects:[],
		  skills:[]
		}
	  }
	componentDidMount(){
		axios.get("/user/profileinfo",{headers: {token: Cookies.get('token')}})
		.then(response => {
			
			this.setState({
				name:response.data.name,
				email:response.data.email,
				phone:response.data.phone,
				company:response.data.company,
				history:response.data.history,
				education:response.data.education,
				experience:response.data.experience,
				projects:response.data.projects,
				skills:response.data.skills

			})

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
            <div  >
                <NavBar/>
               
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
										<div className="discrip-text">{this.state.history}</div>
									</div> 
									
								</div>
								
							</div>
						</div>
						
						<div class="container-fluid">
							<div class="row">
								<div class="rounded-rectangle">
									<div class="con">
										<div class="title">Education</div>
										<div class="bar"> </div>
										<div class="med-title">{this.state.education[0]}</div>

										<hr/>
										<div class="med-title">{this.state.education[1]}</div>
										
									</div>
								</div>
							</div>
		               </div>
					   <div class="container-fluid">
							<div class="row">
								<div class="rounded-rectangle">
									<div class="con">
										<div class="title">Experience</div>
										<div class="bar"> </div>
										<div class="med-title">{this.state.experience[0]}</div>
										
										<hr/>
										<div class="med-title">{this.state.experience[1]}</div>
										
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
										<div class="med-title">{this.state.projects[0]}</div>
										
										<hr/>
										<div class="med-title">{this.state.projects[1]}</div>
										
									</div>
								</div>
							</div>
						</div>
						<div class="container-fluid">
							<div class="row">
								<div class="rounded-rectangle">
									<div class="con">
										<div class="title">Skills</div>
										<div class="bar"> </div>
										{
											this.state.skills.map((item, index) => {
												
												if(item!=""){
													return <div class="high-bar"><span class="skill">{item}</span></div>

												}
											})
										}
										
										
									</div>
								</div>
							</div>
						</div>
						
						
						
                    </div>
					
                    
                     
                        
       
            </div>
        );
    }
}

export default Profile;