import React, { Component } from 'react';
import '../Styles/postjobs.css'
import CNavBar from './CNavBar';
import axios from "axios";
import Cookies from 'js-cookie'

class CPost extends Component {
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
    componentDidMount(){
        axios.get("/company/getcompanyname",{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
            if(response.data.company){
                this.setState({company:response.data.company})
            }


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
    handleClick() {
        
        axios.post("/company/postjob",this.state,{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
            
            if(response.data.errors==undefined){
                window.location.href = `/CpostJobs`;
               
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
     
    render() {
        
      
        return (
            <div>
           
            <CNavBar/>
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

export default CPost;