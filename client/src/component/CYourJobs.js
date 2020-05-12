import React, { Component } from 'react';
import CNavBar from './CNavBar';
import '../Styles/jobs.css'
import CEditJobs from './CEditJobs';

import { NavLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'

import CViewResponse from './CViewResponse';

const divStyle = {
	
	margintop: '2rem',
	background: 'white',
	borderradius: '2rem',
	/*padding-bottom: 2rem;*/
	marginbottom: '2rem',

	
  
  };

class CYourJobs extends Component {
    constructor(props){
        super(props)
		this.state = {
			check: 0,
			jobs:[],
			index:-1,
			jobid:'',
			
			
		};
	}
	componentDidMount(){

		axios.get("/company/getjobs",{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
            //console.log(response.data.companyid)
			this.setState({
				jobs:response.data.jobs,
				
				
			})
			
			

		})
		.catch(function (error) {
			if (error.response) {
			 
			  if(error.response.status===401){
				Cookies.remove('adtoken')
				  window.location.href=`/Clogin`
			  }
			  
			}
		});
    
		
	}
    edit(index){
		this.setState({check:1,index:index})
		
		
		
		

	}
	delete(index,jobid){
		const body={
			index:index,
			jobid:jobid
		}
		
		axios.post("/company/deletejob",body,{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
           
			//window.location.href=`/CyourJobs`
			this.setState({jobs:response.data.job})
			

		})
		.catch(error => {
			console.log(error)
        })

	}
	response(jobid){
		this.setState({check:2,jobid:jobid})
        

    }
   
    render() {
		
		if(this.state.check===1){
			return(
				<CEditJobs index={this.state.index}/>
			)
		}
		if(this.state.check===2){
			return(
				<CViewResponse jobid={this.state.jobid}/>
			)
		}
        
        return (
            <div>
				<CNavBar/>
				
			    <div style={divStyle}>
				<h1>Jobs posted by you</h1>
				</div>
				{
					this.state.jobs.map((item,index)=>
					<div class="container">
				        <div class="white-box">
				            <div class="row approval-card d-flex justify-content-center">
						
							 <div class="col-lg-2">
								<a href=""><img class="dp" src={require("./img/profile.png")}/></a>	
								
							  </div>
							<div class="col-lg-4 profile-info">
								<h5 class="name">Job: {item.title}</h5>
								<div class="discp">Company:{item.company}</div>	
								<div class="discp">Salary: {item.salary}</div>	
								<div class="discp">Discipline: {item.discipline}</div>
								<div class="discp">Experience: {item.experience}</div>								
							</div>
							<div class="col-lg-3">
							<div class="btn-group" role="group" aria-label="Basic example">
							
							<NavLink onClick={this.edit.bind(this,index)} to={{pathname:"/CeditJobs",state:{index:index}}} className="btn btn-primary">Edit</NavLink>
							<NavLink onClick={this.response.bind(this,item._id)} to={{pathname:"/CviewResponse",state:{jobid:item._id}}}  className="btn btn-primary">Response</NavLink> 
                           
							
							<button onClick={this.delete.bind(this,index,item._id)} className="btn btn-primary">Delete</button>
							
						  </div>						
							</div>
																

						</div>
						

								
						<div class="custom-container">
							<h5 class="name">Job Description</h5>
							<div class="description">
						            {item.description}
					        </div>
				        </div>
				   
				     </div>
		
			
				
				    </div>



					)
				}
               
	
		
			
			</div>
           
		);
		
    }
}

export default CYourJobs;