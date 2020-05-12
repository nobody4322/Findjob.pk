import React, { Component } from 'react';
import '../Styles/postjobs.css'
import NavBar from './NavBar';

import axios from "axios";
import Cookies from 'js-cookie'


class Post extends Component {
    constructor(props){
        super(props)
        this.state = {

               title:'',
               company:'',
               description:'',
               discipline:'',
               experience:'',
               salary:'',
               errors:{}

        };
        

      

    }

    handleClick() {
        
      

        axios.post("/user/postjob",this.state,{headers: {token: Cookies.get('token')}})
		.then(response => {
            
            if(response.data.errors==undefined){
                window.location.href = `/postJobs`;
               
            }
            else{
                
                this.setState({errors:response.data.errors})
            }

		})
		.catch(error => {
			console.log(error)
		})
        
       
        
       
      }
      changehandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
      }
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
            <div class="white-box">
                    <div class="title">Post a New Job</div>
                    <div class="bar"> </div>
                    
                    
                    
                        <div class="form-group">
                            <h4 >Job Title</h4>
                            <input type="text" name="title" value={this.state.title}  class="form-control" onChange={this.changehandler}  placeholder="Enter Job Title"/>
                            {this.state.errors.title ? 
                                <span className='error'>{this.state.errors.title}</span>:null}

                        </div>
                        <div class="form-group">
                        <h4 >Company Name</h4>
                        <input type="text" name="company" value={this.state.company} onChange={this.changehandler} list="company" class="form-control" placeholder="Enter Company" />
                        <datalist id="company">
                        <option>Netsol</option>
                        <option>I2c</option>
                        <option>GeniTeam</option>
                        <option>Uworkx</option>
                        </datalist>
                        {this.state.errors.company? 
                            <span className='error'>{this.state.errors.company}</span>:null}
                        </div>
                        <div class="form-group">
                            <h4 >Job Desciption</h4>
                            
                            <textarea type="text" name="description" value={this.state.description} onChange={this.changehandler} class="form-control" placeholder="Enter Job Description"></textarea>
                            {this.state.errors.description ? 
                                <span className='error'>{this.state.errors.description}</span>:null}
                        </div>
                        <div class="form-group">
                        
                            <h4>Discipline</h4>
                            <input type="text" name="discipline" value={this.state.discipline} onChange={this.changehandler} class="form-control" placeholder="Enter Discipline"/>
                            {this.state.errors.discipline ? 
                                <span className='error'>{this.state.errors.discipline}</span>:null}
                        </div>
                          <div class="form-group">
                            <h4>Experience</h4>
                            <input type="text" name="experience" class="form-control" value={this.state.experience} onChange={this.changehandler} placeholder="Enter Experience"/>
                            {this.state.errors.experience ? 
                                <span className='error'>{this.state.errors.experience}</span>:null}
                        </div>
                        <div class="form-group">
                            <h4>Expected Salary</h4>
                            <input type="text" name="salary" value={this.state.salary} onChange={this.changehandler} class="form-control" placeholder="Enter Salary"/>
                            {this.state.errors.salary ? 
                                <span className='error'>{this.state.errors.salary}</span>:null}
                        </div>
                        
                        
                      <button onClick={this.handleClick.bind(this)} class="btn btn-primary">Post Job</button>
                     
                   
            </div>
           
            
        </div>
        
                 
            </div>
        );
      
    }
}

export default Post;