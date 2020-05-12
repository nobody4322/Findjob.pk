import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./component/Login";
import SignUp from "./component/SignUp";



import './App.css';
import Home from './component/Home';
import Profile from './component/Profile';
import Jobs from './component/Jobs';
import Post from './component/Post';
import EditProfile from './component/EditProfile';
import YourJobs from './component/YourJobs';
import ViewResponse from './component/ViewResponse';
import ViewProfile from './component/ViewProfile';
import Contact from './component/Contact';
import EditJobs from './component/EditJobs';

import CompanyLogin from './component/ComapanyLogin';
import CompanySignup from './component/CompanySignup';
import CProfile from './component/CProfile';
import CEditProfile from './component/CEditProfile';
import CYourJobs from './component/CYourJobs';
import CPost from './component/CPost';
import CHome from './component/CHome';
import CEditJobs from './component/CEditJobs';
import CViewResponse from './component/CViewResponse';
import CViewProfile from './component/CViewProfile';
import CContact from './component/CContact';
import { ProtectedRoute } from "./component/protected";
import { ProtectedCRoute } from "./component/protectedcompany";


function App() {
  return (
   
    <div className="App" >
    
    <Router>
      
 
      <Route exact path='/' component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <ProtectedRoute path="/home" component={Home} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/jobs" component={Jobs} />
      <ProtectedRoute path="/editJobs" exact component={EditJobs}/>
      <ProtectedRoute path="/postJobs" component={Post} />
      <ProtectedRoute path="/edit" component={EditProfile} />
      <ProtectedRoute path="/yourJobs" component={YourJobs} />
      <ProtectedRoute path="/viewResponse" component={ViewResponse} />
      <ProtectedRoute path="/viewProfile" component={ViewProfile} />
      <ProtectedRoute path="/contact" component={Contact} />
     
      <Route path="/Clogin" component={CompanyLogin} />
      <Route path="/Csignup" component={CompanySignup} />
      <ProtectedCRoute path="/Cprofile" component={CProfile} />
      <ProtectedCRoute path="/Cedit" component={CEditProfile} />
      <ProtectedCRoute path="/CyourJobs" component={CYourJobs} />
      <ProtectedCRoute path="/CpostJobs" component={CPost} />
      <ProtectedCRoute path="/Chome" component={CHome}/>
      <ProtectedCRoute path="/CeditJobs" exact component={CEditJobs}/>
     
      <ProtectedCRoute path="/CviewResponse" component={CViewResponse}/>
      <ProtectedCRoute path="/CviewProfile" component={CViewProfile} />
      <ProtectedCRoute path="/Ccontact" component={CContact}/>
      
      
      </Router>
        
    </div>
    
    
    
  );
}

export default App;