import React, { Component } from 'react';
import NavBar from './NavBar';
import '../Styles/jobs.css'


import { NavLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'

import EditJobs from './EditJobs';

const divStyle = {
	
	margintop: '2rem',
	background: 'white',
	borderradius: '2rem',
	/*padding-bottom: 2rem;*/
	marginbottom: '2rem',

	
  
  };

class YourJobs extends Component {
    constructor(props){
        super(props)
		this.state = {
			check: 0,
			jobs:[],
			index:-1,
			
		};
	}
	componentDidMount(){

		axios.get("/user/getjobs",{headers: {token: Cookies.get('token')}})
		.then(response => {

			this.setState({
				jobs:response.data.jobs
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
    edit(index){
		this.setState({check:1,index:index})
	}
	delete(indexx,jobid){
		const body={
			index:indexx,
			jobid:jobid
		}
		
		axios.post("/user/deletejob",body,{headers: {token: Cookies.get('token')}})
		.then(response => {
           
			//window.location.href=`/yourJobs`
			this.setState({jobs:response.data.job})
			

		})
		.catch(error => {
			console.log(error)
        })

	}
	response(){
        

    }
    render() {
		if(this.state.check==1){
			return(
				<EditJobs index={this.state.index}/>
			)
		}
		
    

        return (
            <div>
				<NavBar/>
				
				<div style={divStyle}>
				<h1 >Jobs posted by you</h1>
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
							
							<NavLink onClick={this.edit.bind(this,index)} to={{pathname:"/editJobs",state:{index:index}}}  className="btn btn-primary">Edit</NavLink>
							<NavLink onClick={this.response.bind(this)} to={{pathname:"/viewResponse",state:{jobid:item._id}}} className="btn btn-primary">Response</NavLink> 
                           
							
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

export default YourJobs;