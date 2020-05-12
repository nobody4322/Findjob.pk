import React, { Component } from 'react';
import '../Styles/postjobs.css'
import NavBar from './NavBar';

import axios from "axios";
import Cookies from 'js-cookie'


class EditJobs extends Component {
    constructor(props){
        super(props)
        this.state = {
            isToggleOn: false,
            title:'',
            company:'',
            description:'',
            discipline:'',
            experience:'',
            salary:'',
            errors:{},
            index:props.location.state.index
           // index:props.index,
            
         

        };
        
    }
    componentDidMount(){
     
        axios.get("/user/getjobs",{headers: {token: Cookies.get('token')}})
		.then(response => {

			this.setState({
                title:response.data.jobs[this.state.index].title,
                company:response.data.jobs[this.state.index].company,
                description:response.data.jobs[this.state.index].description,
                discipline:response.data.jobs[this.state.index].discipline,
                experience:response.data.jobs[this.state.index].experience,
                salary:response.data.jobs[this.state.index].salary,

            })
            
			

		})
		.catch(function (error) {
            if (error.response) {
             
              if(error.response.status===401){
                Cookies.remove('token')
                  window.location.href=`/login`
              }
              
            }
      });
    
        
    }
    
    handleClick() {
        this.setState({isToggleOn: !this.state.isToggleOn})
        axios.post("/user/editjob",this.state,{headers: {token: Cookies.get('token')}})
		.then(response => {
            
            if(response.data.errors===undefined){
                window.location.href = `/yourJobs`;
               
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
       // this.props.location.state.index?alert(this.props.location.state.index):alert('yo')
       
       if( this.props.location.state.index>=0){
           alert('0')
       }
       else{
        alert('1')
       }
     
        return (
            
            <div>
           
            <NavBar/>
            
            
                    
           
          
            <div class="container">
            <div class="white-box">
                    <div class="title">Edit Job</div>
                    <div class="bar"> </div>
                    
                    
                    
                        <div class="form-group">
                            <h4 >Job Title</h4>
                            <input type="text" name="title" onChange={this.changehandler}  class="form-control" value={this.state.title} placeholder="Enter Job Title"/>
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
                            
                            <textarea type="text" name="description" onChange={this.changehandler} class="form-control" value={this.state.description} placeholder="Enter Job Description"></textarea>
                            {this.state.errors.description ? 
                                <span className='error'>{this.state.errors.description}</span>:null}
                            </div>
                        <div class="form-group">
                        
                            <h4>Discipline</h4>
                            <input type="text" name="discipline" onChange={this.changehandler} class="form-control" value={this.state.discipline} placeholder="Enter Discipline"/>
                            {this.state.errors.discipline ? 
                                <span className='error'>{this.state.errors.discipline}</span>:null}
                            </div>
                          <div class="form-group">
                            <h4>Experience</h4>
                            <input type="text" name="experience" onChange={this.changehandler} class="form-control" value={this.state.experience}  placeholder="Enter Experience"/>
                            {this.state.errors.experience ? 
                                <span className='error'>{this.state.errors.experience}</span>:null}
                            </div>
                        <div class="form-group">
                            <h4>Expected Salary</h4>
                            <input type="text" name="salary" onChange={this.changehandler} class="form-control" value={this.state.salary} placeholder="Enter Salary"/>
                            {this.state.errors.salary ? 
                                <span className='error'>{this.state.errors.salary}</span>:null}
                            </div>
                        
                        
                      <button onClick={this.handleClick.bind(this)} class="btn btn-primary">Save</button>
                     
                   
            </div>
        
            
        </div>
        
       
        
                 
            </div>
        );
       }
      
    
}

export default EditJobs;