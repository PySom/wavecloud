import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";


export default class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          email:'',
          Authentication: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    
      }
    
      
    
     handleEmailChange(e) {
          this.setState({...this.state, email: e.target.value})
      
    }  
    



    submitForm(e) {
        e.preventDefault();
        axios.post(`/api/account/generatecode?email=${this.state.email}`)
        .then(response => {
            console.log(response)
        })
    
        .catch(err => console.log(err))
  
      }

      authentication() {
          if(this.state.Authentication === true ) {
              return true
          }
      }
    

    
     render() {
        console.log("email",this.state.email)
        console.log( "password",this.state.password)
        console.log("auth", this.state.Authentication)
        let auth =  this.authentication()
        
        return (
          
            <>
            {auth ? <Redirect to = {{pathname: "/"}}/> : ( 
                  <div className="background-image">
                  <div className="d-inline  pad-login">
                     <h3 className="login">Forgot Password</h3>
                     <div className="d-flex">
                                  <img className="login-right" src="images/loginfacebook.svg"/>
                                  <img className="login-right" src="images/logingoogle.svg"/>
                                  <img className="login-right" src="images/logintwitter.svg"/>
                                  <img className="login-right" src="images/logininstagram.svg"/>
                      </div>
                      <div className="resized">
                          <p className="resized-p">or use your account </p>
                      </div>
                      <form method="POST" onSubmit={this.submitForm}>  
                       <div className="pad-account">
                       <div className="input-group d-inline">
                           <h3 className="input-box">Email</h3>  
                          <input className="input--style-3" type="email" name="email address"  id="inputEmail"
                          value={this.state.email} onChange={this.handleEmailChange} required
                          />
                      </div>
                     <div className="d-flex">
                     <div className="resized">
                        <Link to="/Login">
                          <p className="forgot">Login</p>
                        </Link> 
                      </div>
                      <div className="resized-right">
                          <Link className="forgot" to="/register">Register</Link>
                      </div>
      
                     </div>
      
                     <div >
                          <button className="login-button"  type="submit" > Submit</button>
                      </div>
                    
      
                       </div>
                   </form>
                       
                      
                  </div>
               </div>
       
        
            )}
   
               
            </>
        )
    }
}
