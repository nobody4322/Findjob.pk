import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile'
import Home from './Home';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'

class EditProfile extends Component {
    constructor(props){
        super(props)
        
        this.state = {
           
            company:'',
            history:'',
            education:[],
            experience:[],
            projects:[],
            skills:[],
        };
        
    }
    componentDidMount(){
		axios.get("/user/profileinfo",{headers: {token: Cookies.get('token')}})
		.then(response => {
			
			this.setState({
				
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
    changehandler=(e)=>{
      
        this.setState({[e.target.name]:e.target.value})
    }
    mySubmitHandler() {
        
        axios.post("/user/updateprofile",this.state,{headers: {token: Cookies.get('token')}})
		.then(response => {
            
		   window.location.href=`/profile`
			

		})
		.catch(error => {
			console.log(error)
		})
       
    }
      
    handleChange(e) {
        const education =this.state.education;
        education[e.target.id] = e.target.value;
        
        this.setState({
          education: education,
         
        });
      }
      handleChange1(e) {
       
        const experience =this.state.experience;
       
       
        experience[e.target.id] = e.target.value;
        this.setState({
         
          experience:experience
        });
      }
      handleChange2(e) {
       
        const projects =this.state.projects;
       
       
        projects[e.target.id] = e.target.value;
        this.setState({
         
          projects:projects
        });
      }
      handleChange3(e) {
       
        const skills =this.state.skills;
       
       
        skills[e.target.id] = e.target.value;
        this.setState({
         
          skills:skills
        });
      }
   
  

    render() {
       
        
        
        
        return (
            <div>
            <NavBar/>
            <div class="container">
            <div class="white-box">
                    <div class="title">Edit Profile</div>
                    <div class="bar"> </div>
                    
                    
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
                            
                            <textarea type="text" name="history" class="form-control" value={this.state.history} onChange={this.changehandler} placeholder="Professional history if you are currently working somewhere"></textarea>
                        </div>
                        <div class="form-group">
                        
                            <h4>Education</h4>
                            <input  type="text" id="0" name="education" value={this.state.education[0]} onChange={e=>this.handleChange(e)}  class="form-control"  placeholder="FSC with year"/>
                            <input type="text"  id="1" name="education" value={this.state.education[1]} onChange={e=>this.handleChange(e)} class="form-control"  placeholder="Bachelor with year"/>
                        </div>
                          <div class="form-group">
                            <h4>Experience</h4>
                            <input type="text" name="experience" value={this.state.experience[0]} onChange={e=>this.handleChange1(e)} class="form-control" id="0" placeholder="Enter Experience 1 with detail "/>
                            <input type="text" name="experience" value={this.state.experience[1]} onChange={e=>this.handleChange1(e)} class="form-control" id="1" placeholder="Enter Experience 2 with detail"/>
                        </div>
                        <div class="form-group">
                            <h4>Projects</h4>
                            <input type="text" class="form-control" id="0" value={this.state.projects[0]} onChange={e=>this.handleChange2(e)}  placeholder="Enter Project 1 with detail"/>
                            <input type="text" class="form-control" id="1" value={this.state.projects[1]} onChange={e=>this.handleChange2(e)}  placeholder="Enter Project 2 with detail"/>
                        </div>
                        <div class="form-group">
                            <h4>Skills</h4>
                            <input type="text" class="form-control" id="0" value={this.state.skills[0]} onChange={e=>this.handleChange3(e)} placeholder="Enter Skill 1"/>
                            <input type="text" class="form-control" id="1" value={this.state.skills[1]} onChange={e=>this.handleChange3(e)}  placeholder="Enter Skill 2"/>
                            <input type="text" class="form-control" id="2" value={this.state.skills[2]} onChange={e=>this.handleChange3(e)}  placeholder="Enter Skill 3"/>
                            <input type="text" class="form-control" id="3" value={this.state.skills[3]} onChange={e=>this.handleChange3(e)} placeholder="Enter Skill 4"/>
                        </div>
                        
    
                      
                      <button onClick={this.mySubmitHandler.bind(this)}  className="btn btn-primary" >Save</button>
                      
                   
            </div>
            
        </div>
                 
            </div>
        );
        
    }
}


export default EditProfile;