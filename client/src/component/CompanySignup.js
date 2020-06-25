import React, { Component } from 'react';
import '../Styles/styles.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import axios from 'axios';
import Cookies from 'js-cookie'


class CompanySignup extends Component {
  constructor(props){
    super(props)
    this.state = {
      
      fullname: '',
      email: '',
      password: '',
      mobile:'',
      company:'',
      errors:{}
    };
  
}
changehandler=(e)=>{
  this.setState({[e.target.name]:e.target.value})
 }
  register(){
    axios.post("/company/signup", this.state)
    .then(response => {
      if(response.data.errors==undefined){
        window.location.href = `/Clogin`;
    }
    else{
        this.setState({errors:response.data.errors})
    }
      
    });
  }
    render() {
      if(Cookies.get('adtoken'))
          {
            let token=Cookies.get('adtoken')
            const body={
              token:token
            }
            
            axios.post("/company/authenticate", body)
            .then(response=>{
             
              if(response.data.check==true){
                window.location.href = `/Chome`;

              }
        

            })
              
            
          }
      
      

        return (
            <div class="container">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                 
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to={"/Clogin"}>Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/Csignup"}>Sign up</Link>
                      </li>
                    </ul>
                  </div>
                </div>
            </nav>
                   
            <div class="row text-white">
                
                 <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                     <img class="logo" src={require("./img/findjob.png")}/>
                     <h1 class="display-6 py-2 text-truncate">Company Sign Up</h1>
                     <div class="px-2">
                     
                        <div class="form-group">
                        <input name="email" type="email" className="form-control" onChange={this.changehandler} value={this.state.email}  placeholder="Enter email"/>
                    
                           {this.state.errors.email ? 
                            <span className='error'>{this.state.errors.email}</span>:null}
                        </div>
                         <div class="form-group">
                         <input name="password" type="password" className="form-control"  onChange={this.changehandler} value={this.state.password} placeholder="Password"/>
                         {this.state.errors.Password? 
                             <span className='error'>{this.state.errors.Password}</span>:null}
                         </div>
                         <div class="form-group">
                         <input name="fullname" type="fullname" className="form-control"  onChange={this.changehandler} value={this.state.fullname} placeholder="Enter full name"/>
                           {this.state.errors.Fullname ? 
                        <span className='error'>{this.state.errors.Fullname}</span>:null}
                         </div>
                         <div class="form-group">
                         <input name="mobile" type="mobile" className="form-control"  onChange={this.changehandler} value={this.state.mobile} placeholder="Enter Mobile number"/>
                           {this.state.errors.Mobile ? 
                        <span className='error'>{this.state.errors.Mobile}</span>:null}
                         </div>
                         <div class="form-group">
                         <input name="company" type="companyname" className="form-control"  onChange={this.changehandler} value={this.state.company} placeholder="Enter Company name"/>
                         {this.state.errors.Company ? 
                         <span className='error'>{this.state.errors.Company}</span>:null}
                         </div>
                         <button onClick={this.register.bind(this)} class="btn btn-primary btn-lg">Register</button>
                        
                         <div class="dis">
                         <ul className="navbar-nav ml-auto">
                          
                           <li className="nav-item">
                             <Link className="nav-link" to={"/Clogin"}>Login</Link>
                           </li>
                         </ul>
                         </div>
                      
                        
                    
                     </div>
                 </div>
             </div>
         </div>
        );
    }
}

export default CompanySignup;