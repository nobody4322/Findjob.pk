import React, { Component } from 'react';


import CNavBar from './CNavBar';

import axios from "axios";
import Cookies from 'js-cookie'
import swal from 'sweetalert';

class CContact extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            check:0,
            userid:props.location.state.userid,
            msg:'',
            subject:'',
            error:{}
        };

    }
    send()
    {
        if(this.state.msg=='' || this.state.subject=='')
        {
            const er={
                msg:"all fields are required"
            }
            
            this.setState({error:er})
            
        }
        if(this.state.subject!='' && this.state.msg!=''){
        axios.post("/company/send",this.state,{headers: {token: Cookies.get('adtoken')}})
		.then(response => {
            if(response.data.check==true){
               
               swal("Email sent!", "", "success");
               this.setState({msg:'',subject:'',error:{}})

            }
            else if(response.data.check==false){
                swal("Invalid email adress!", "", "error");
               this.setState({msg:'',subject:'',error:{}})

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
                    <div class="title">Contact</div>
                    <div class="bar"> </div>
                    
                   
                        
                        <div class="form-group">
                            <h4 >Message</h4>
                            
                            <input type="text" name="subject"   value={this.state.subject} onChange={this.changehandler} class="form-control" placeholder="Enter Subject" />
                            {this.state.error.subject ? 
                                <span className='error'>{this.state.error.subject}</span>:null}
                            <textarea type="text"  name="msg" value={this.state.msg} onChange={this.changehandler}  class="form-control" placeholder="Write your message"></textarea>
                            {this.state.error.msg ? 
                                <span className='error'>{this.state.error.msg}</span>:null}
                            </div>
                            <button onClick={this.send.bind(this)}  className="btn btn-primary">Send</button> 
    
            </div>
            
        </div>
                 
            </div>
        );
        
    }
}


export default CContact;