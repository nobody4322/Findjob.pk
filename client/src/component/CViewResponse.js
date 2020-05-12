import React, { Component } from 'react';
import '../Styles/viewResponse.css'
import CNavBar from './CNavBar';
import CViewProfile from './CViewProfile';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie'


const divStyle = {
	
	margintop: '2rem',
	background: 'white',
	borderradius: '2rem',
	/*padding-bottom: 2rem;*/
	marginbottom: '2rem',

	
  
  };


class CViewResponse extends Component {
    constructor(props) {
        super(props);
        this.state={
            check:0,
            //jobid:props.jobid,
            name:[],
            userid:null,
            jobid:props.location.state.jobid  
        }


    }
    componentDidMount(){
        
        axios.post("/company/findapplicantname",this.state,{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
            
            this.setState({name:response.data.name})
            console.log(this.state.name)
			

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
    view(userid){
       this.setState({check:1,userid:userid})
    }
    render() {
        
        if(this.state.check==1){
            return(
                <CViewProfile userid={this.state.userid} />   
            )

         
        }
        else{

        
        return (
            <div>
                <CNavBar/>
                <div style={divStyle}>
                <h1 >Response</h1>
                </div>
                {
                    this.state.name.map(data=>
                        <div class="container-fluid">
                   <div class="row">
                       <div class="rounded-rectangle1">
                           <div class="con">
                                <div class="dp-pic">
                                     <img class="dp-img" src={require("./img/profile.png")}/>
                                    <div class="status-name">{data.Fullname}</div>
                                    <NavLink onClick={this.view.bind(this,data.id)} to={{pathname:"/CviewProfile",state:{userid:data.id}}}  className="btn btn-primary">View Profile</NavLink>    
                                </div>

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
}



export default CViewResponse;