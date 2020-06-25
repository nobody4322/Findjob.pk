import React, { Component } from 'react';
import '../Styles/styles.css'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import Home from './Home'
import axios from "axios";
import Cookies from 'js-cookie'


class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      togle:false,
      errors:{},
      auth: false,
      
    }
  }
  login1(){
    this.setState({togle:true})
  }
  login(){
   
          axios.post('/user/login', this.state)
                .then(response => {
                
                 
                  if(response.data.errors==undefined){
                   
                   Cookies.set('token', response.data.token,{ expires: 7 })

               
                    window.location.href = `/home`;
                   
               
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
   componentClicked = () => {
    console.log('Facebook btn clicked');

    
}
responseFacebook = response => {
  
  if(response.status !== 'unknown'){
  
     
     const user={
      name: response.name,
      
      email:response.email,
     }
     axios.post("/user/fb", user)
     .then(response => {
       if(response.data.errors==undefined){
        
        Cookies.set('token', response.data.token,{ expires: 7 })

         window.location.href = `/home`;
       }
       else{
        
         this.setState({errors:response.data.errors})
       }
       
     })
     .catch(error => {
      console.log(error)
     })
     
     
     

  }
  
  
}


    render() {
      
      
      let facebookData;
      facebookData = (<FacebookLogin
        appId="1055988318107297"
          autoLoad={false}
          
          fields="name,email"
          onClick={this.componentClicked}
          callback={this.responseFacebook} />);
          if(Cookies.get('token'))
          {
            let token=Cookies.get('token')
            const body={
              token:token
            }
            
           
            axios.post("/user/authenticate", body)
            .then(response=>{
             
              if(response.data.check==true){
                window.location.href = `/home`;

              }
        

            })
              
            
          }




       

        return (

          <div class="container bg">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
           
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/signup"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
             
             <div class="row text-white">
                 
                  <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                      <img class="logo" src={require("./img/findjob.png")}/>
                      <h1 class="display-4 py-2 text-truncate">User Login</h1>
                      <div class="px-2">
                      
                         <div class="form-group">
                         <input type="email"  value={this.state.email} onChange={this.changehandler} className="form-control form-control-lg" placeholder="email"
                         name="email"/>
                          {this.state.errors.Email ? 
                          <span className='error'>{this.state.errors.Email}</span>:null}
                         </div>
                          <div class="form-group">
                          <input type="password"  value={this.state.password} onChange={this.changehandler} className="form-control form-control-lg" placeholder="Password"
                          name="password"/>
                          {this.state.errors.Password ? 
                           <span className='error'>{this.state.errors.Password}</span>:null}
                          </div>
                          <button onClick={this.login.bind(this)} class="btn btn-primary">Login</button>
                          
                          <div>{facebookData}</div>
                          {this.state.errors.Check ? 
                            <span className='error'>{this.state.errors.Check}</span>:null}

                            <div class="dis">
                                     <ul className="navbar-nav ml-auto">
                          
                                    <li className="nav-item">
                                         <Link className="nav-link" to={"/signup"}>Sign Up</Link>
                                    </li>
                                      </ul>
                                </div>
    

                         

                      
                        
                      
                      
                    
                      </div>
                      
                  </div>
                  
              </div>
          </div>
            
        )
          
      
     
       
    }
}

export default Login;