import React, { Component } from 'react';
import '../Styles/fontawsome.css';
import { NavLink } from 'react-router-dom';
import '../Styles/navbar.css';

import {Helmet} from "react-helmet";
import Cookies from 'js-cookie'

class CNavBar extends Component {
  logout(){
    Cookies.remove('adtoken')
    window.location.href = `/Clogin`;
  
  }
  
    render() {
      
        
        return (
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <Helmet>
              <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
              <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
                          
          </Helmet>
         
          <a className="navbar-brand">FindJob</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav" onClick={this.change}>
              <li className="nav-item">
                <NavLink activeClassName="active" className="btn nav-link" to="/Chome">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink  className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" activeClassName="active" to="/Cprofile">Profile</NavLink>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    
                    <NavLink activeClassName="active" className="dropdown-item" to="/Cedit">Edit</NavLink>
                    <NavLink onClick={this.logout} activeClassName="active" className="dropdown-item" to="/Clogin">LogOut</NavLink>
    
                </div>
                
                </li>
                <li className="nav-item">
                <NavLink activeClassName="active" className="btn nav-link"  to="/CyourJobs">Your Jobs</NavLink>
                
                </li>
              
              <li className="nav-item">
              <NavLink activeClassName="active"  className="btn nav-link"  to="/CpostJobs">Post A Job</NavLink> 
            </li>
            
            </ul>
          </div>  
        </nav>

        )
      
      
    }
}

export default CNavBar;