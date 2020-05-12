import React, { Component } from 'react';
import CNavBar from './CNavBar';
import '../Styles/profile.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Styles/viewProfile.css'
import Contact from './Contact';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'

class CViewProfile extends Component {
    constructor(props){
        super(props)
      
        this.state = {
			check: 0,
			//userid:props.userid,
			userid:props.location.state.userid,
			profile:{},
			projects:[],
			education:[],
			experience:[],
			
			skills:[]

		};

	}
	componentDidMount(){
        
        axios.post("/company/findapplicantdetail",this.state,{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
			this.setState({profile:response.data.profile,
			projects:response.data.profile.Projects,
			education:response.data.profile.Education,
			experience:response.data.profile.Experience,
			skills:response.data.profile.Skills
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
    contact(){
    this.setState({check:1})

    }
    render() {
		//console.log(this.state.profile.Projects[0])
        if(this.state.check==1){
            return(
            <Contact/>
            )
        }
        else{ 
        return (
            <div  >
				<CNavBar/>
				<NavLink onClick={this.contact.bind(this)}  className="bt btn btn-primary" to={{pathname:"/Ccontact",state:{userid:this.state.userid}}}>Contact</NavLink> 
                
               
                     <div class="pic">
                        <img  class=" rounded-circle profile-image" src={require("./img/profile.png")}/>
                        <h3 class="change">{this.state.profile.Fullname}</h3>
                        <h3 class="change">{this.state.profile.Email}</h3>
						<h3 class="change">{this.state.profile.Mobile}</h3>
                        <div class="change" ><i className="fas fa-map-marker-alt"></i>  Lahore, Pakistan</div>
                     </div>
                     <div className="container">
						 <div className="container-fluid cont">
							<div className="row">
								<div className="col-lg-6 left-box">
									<div className="con">
										<div className="title">Company</div>
										<div className="bar"> </div>
										<h2 className="discrip-text">{this.state.profile.Company}</h2>
									</div>
								</div>
								<div className="col-lg-5 right-box">
								    <div className="con">
										<div className="title">Professional History</div>
										<div className="bar"> </div>
										<div className="discrip-text"> {this.state.profile.History}  </div>
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
						<div class="row">
							<div class="rounded-rectangle">
								<div class="con">
									<div class="title">Skills</div>
									<div class="bar"> </div>
									<div class="high-bar"><span class="skill">{this.state.skills[0]}</span></div>
									<div class="high-bar"><span class="skill">{this.state.skills[1]}</span></div>
									<div class="high-bar"><span class="skill">{this.state.skills[2]}</span></div>
									<div class="high-bar"><span class="skill">{this.state.skills[3]}</span></div>
									
								</div>
							</div>
			            </div>
                    </div>
					
            </div>
        );
        }
    }
}

export default CViewProfile;