import React, { Component } from 'react';

import CNavBar from './CNavBar';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'
class CEditProfile extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            isLoggedIn: true,
            company:'',
            history:'',
            services:[],
            projects:[],
            adress:''
        };

    }
    componentDidMount(){
		axios.get("/company/profileinfo",{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
			
			this.setState({
				
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
    mySubmitHandler() {
        axios.post("/company/updateprofile",this.state,{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
            
		   window.location.href=`/Cprofile`
			

		})
		.catch(error => {
			console.log(error)
		})
    }
    changehandler=(e)=>{
      
        this.setState({[e.target.name]:e.target.value})
    }
    handleChange(e) {
        const services =this.state.services;
        services[e.target.id] = e.target.value;
        
        this.setState({
          services: services,
         
        });
      }
      handleChange1(e) {
        const projects =this.state.projects;
        projects[e.target.id] = e.target.value;
        
        this.setState({
          projects: projects,
         
        });
      }
   
  

    render() {
       
        
        return (
            <div>
            <CNavBar/>
            <div class="container">
            <div class="white-box">
                    <div class="title">Edit Profile</div>
                    <div class="bar"> </div>
                    
                    <form >
                    <div class="form-group">
                    <h4 >Company</h4>
                    <input type="text" name="company" list="company"  value={this.state.company} onChange={this.changehandler} class="form-control" placeholder="Enter Company" />
                    <datalist id="company">
                    <option>Netsol</option>
                    <option>I2c</option>
                    <option>GeniTeam</option>
                    <option>Uworkx</option>
                    </datalist>
                  
                    </div>
                        
                        <div class="form-group">
                            <h4 >Summary</h4>
                            
                            <textarea type="text" name="history" value={this.state.history} onChange={this.changehandler} class="form-control" placeholder="Professional history of your company"></textarea>
                        </div>
                        <div class="form-group">
                        
                            <h4>Services</h4>
                            <input type="text" class="form-control" id="0" value={this.state.services[0]} onChange={e=>this.handleChange(e)}  placeholder="Enter service 1 "/>
                            <input type="text" class="form-control" id="1" value={this.state.services[1]} onChange={e=>this.handleChange(e)}  placeholder="Enter service 2"/>
                            
                        </div>
                        <div class="form-group">
                        
                            <h4>Projects</h4>
                            <input type="text" class="form-control" id="0" value={this.state.projects[0]} onChange={e=>this.handleChange1(e)}  placeholder="Enter Project 1"/>
                            <input type="text" class="form-control" id="1" value={this.state.projects[1]} onChange={e=>this.handleChange1(e)}  placeholder="Enter Project 2"/>
                            
                        </div>
                        <div class="form-group">
                        
                            <h4>Adress</h4>
                            <textarea type="text" name="adress" value={this.state.adress} onChange={this.changehandler} class="form-control" placeholder="Your Company Adress"></textarea>
                            
                        </div>
                          
                        
    
                      
                      <NavLink onClick={this.mySubmitHandler.bind(this)}  className="btn btn-primary"  to="/Cprofile">Save</NavLink>
                      
                    </form>
            </div>
            
        </div>
                 
            </div>
        );
        
        
    }
}


export default CEditProfile;