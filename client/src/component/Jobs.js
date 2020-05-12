import React, { Component } from 'react';
import NavBar from './NavBar';
import '../Styles/jobs.css'
import axios from "axios";
import Cookies from 'js-cookie'

class Jobs extends Component {
	constructor(props){
		super(props)
		this.state={
		  companyjobs:[],
		  userjobs:[],
		  status:false,
		  query: '',
		}
	  }

	componentDidMount(){
		axios.get("/company/findall",{headers: {token: Cookies.get('token')}})
		.then(response => {
			
			if(response.data.users){
				//console.log(response.data.users)
				this.setState({companyjobs:response.data.users})
			
			}
            


        })
        .catch(function (error) {
            if (error.response) {
             
              if(error.response.status===401){
                Cookies.remove('token')
                  window.location.href=`/login`
              }
              
            }
        });
    

		axios.get("http://localhost:5000/user/findall",{headers: {token: Cookies.get('token')}})
		.then(response => {
			
			if(response.data.users){
				console.log(response.data.users)
				this.setState({userjobs:response.data.users})
			
			}
            


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
	handleInputChange = (event) => {
		this.setState({
			query: event.target.value
		},()=>{
	  this.filterArray();
	})
	
	}
	
	apply(jobid,companyid){
		
		const body={
			jobId:jobid,
			companyId:companyid
		}
		
		axios.post("/company/response",body,{headers: {token: Cookies.get('token')}})
		.then(response => {
			
		 // window.location.href=`/jobs`
		 this.state.companyjobs.map(data=>{
			data.Jobs.map(data1=>{
				if(data1._id===jobid){
					data1.Status=true;
					this.setState({data1:data1})
				}
			})
		})
			
            


        })
        .catch(error => {
			console.log(error)
		})
		
		
	}
	filterArray = () => {
		let searchString = this.state.query;
		
	
	
	
		if(searchString.length > 0){
			// console.log(responseData[i].name);
			this.state.companyjobs.filter(name=>console.log(name))
		}
	
	}
	apply1(jobid,userid){
		
		const body={
			jobId:jobid,
			userId:userid
		}
		
		axios.post("/user/response",body,{headers: {token: Cookies.get('token')}})
		.then(response => {
			
		  this.state.userjobs.map(data=>{
			  data.Jobs.map(data1=>{
				  if(data1._id===jobid){
					  data1.Status=true;
					  this.setState({data1:data1})
				  }
			  })
		  })
			
            


        })
        .catch(error => {
			console.log(error)
		})
		
		
	}
	
    render() {
		
		const toLowerCase = this.state.query.toLowerCase();
	
        return (
            <div>
				<NavBar/>
				<form class="form-inline my-2 my-lg-0" style={{marginLeft:'30%'}}>
	                   <input class="form-control mr-lg-8" id="filter" type="search" onChange={this.handleInputChange} placeholder="Search" aria-label="Search"/>
	                   
				</form>
				{
					
                    this.state.companyjobs.map((data)=>{
					//if(this.state.query=='')
					
					return(
                        data.Jobs.filter(filter=>filter.title.toLowerCase().includes(toLowerCase)).map((data1)=>
						//data.Jobs.map((data1)=>
						<div class="container">
						<div class="white-box">
							<div class="row approval-card d-flex justify-content-center">
								 <div class="col-lg-2">
									<a href=""><img class="dp" src={require("./img/profile.png")}/></a>		
								</div>
								<div class="col-lg-4 profile-info">
									<h5 class="name">Job:{data1.title}</h5>
									<div class="discp">{data1.company}</div>	
									<div class="discp">Salary: {data1.salary}</div>	
									<div class="discp">Discipline: {data1.discipline}</div>
									<div class="discp">Experience: {data1.experience}</div>								
								</div>
								
								

								
								{data1.Status?
								<div class="col-lg-3 d-flex btns">
										<button type="button" class="btn btn-primary ml-4" data-toggle="tooltip" data-placement="top" title="You have applied">Applied</button>	
								</div>:
								<div class="col-lg-3 d-flex btns">
										<button onClick={this.apply.bind(this,data1._id,data.Company)} type="button" class="btn btn-primary ml-4" data-toggle="tooltip" data-placement="top" title="Before Applying, Make Sure Your Profile is updated">Apply</button>	
								</div>
							}
								
									
	
							</div>
							<div class="custom-container">
								<h5 class="name">Job Description</h5>
								<div class="description">
										{data1.description}
								</div>
							</div>
					   
					   
					   
					   
					   </div>
			
				
					
					</div>
	
	
	
	
						
						
						)
					

					)
					
					
					
						
							
					
					
						
					})

				}
				<div>jobs by user</div>
				{
                    this.state.userjobs.map((data)=>{
						
					return(
                        data.Jobs.filter(filter=>filter.title.toLowerCase().includes(toLowerCase)).map((data1)=>
						//data.Jobs.map((data1)=>
						<div class="container">
						<div class="white-box">
							<div class="row approval-card d-flex justify-content-center">
								<div class="col-lg-2">
									<a href=""><img class="dp" src={require("./img/profile.png")}/></a>		
								</div>
								<div class="col-lg-4 profile-info">
									<h5 class="name">Job:{data1.title}</h5>
									<div class="discp">{data1.company}</div>	
									<div class="discp">Salary: {data1.salary}</div>	
									<div class="discp">Discipline: {data1.discipline}</div>
									<div class="discp">Experience: {data1.experience}</div>								
								</div>
								
								

								
								{data1.Status?
								<div class="col-lg-3 d-flex btns">
										<button type="button" class="btn btn-primary ml-4" data-toggle="tooltip" data-placement="top" title="You have applied">Applied</button>	
								</div>:
								<div class="col-lg-3 d-flex btns">
										<button onClick={this.apply1.bind(this,data1._id,data.User)} type="button" class="btn btn-primary ml-4" data-toggle="tooltip" data-placement="top" title="Before Applying, Make Sure Your Profile is updated">Apply</button>	
								</div>
							}
								
									
	
							</div>
							<div class="custom-container">
								<h5 class="name">Job Description</h5>
								<div class="description">
										{data1.description}
								</div>
							</div>
					   
					   
					   
					   
					   </div>
			
				
					
					</div>
	
	
	
	
						
						
						)

					)
						
							
					

						
					})

				}
	            		
                

				
	

            </div>
        );
    }
}

export default Jobs;