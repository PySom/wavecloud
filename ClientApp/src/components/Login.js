import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          email:'',
          password: '',
          Authentication: false
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    
      }
    
      
    
     handleEmailChange(e) {
          this.setState({...this.state, email: e.target.value})
      
    }  
    
    handlePasswordChange(e) {
        this.setState({...this.state, password: e.target.value})
    }


    submitForm(e) {
        const data = {
            Email: this.state.email,
            Password: this.state.password,
          }
        
        console.log(data)
        e.preventDefault();
        axios.post('/api/account/login', data).then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userdata', JSON.stringify(response.data))
          localStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin))
          let userdata = localStorage.getItem('userdata')
           this.setState({...this.state, error:userdata, Authentication:true});
        })
    
        .catch(err => {
            console.log(err)
            const warn = document.getElementById("_warning");
            if(warn.classList.contains("d-none")){
              warn.classList.add("d-block");
            }
            else {
              warn.classList.remove("d-none") ;
            }
          })
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
                <div className="contain-it">
                    <div className="row">
                        <div className="col-md-6 mobile-login">
                        <div className="background-image">
                  
                        </div>
                        </div>
                        <div className="col-md-6 col-12 pad-login">
                        <div className="d-inline">
                     <h3 className="login">Login</h3>
                     <div className="d-flex">
                                  <img className="login-right" src="images/loginfacebook.svg"/>
                                  <img className="login-right" src="images/logingoogle.svg"/>
                                  <img className="login-right" src="images/logintwitter.svg"/>
                                  <img className="login-right" src="images/logininstagram.svg"/>
                      </div>
                      <div className="resized">
                          <p className="resized-p">or use your account </p>
                      </div>
                      <form  className="form-width" method="POST" onSubmit={this.submitForm}>  
                       <div className="pad-account">
                       <div className="input-group d-inline">
                           <h3 className="input-box">Email</h3>  
                          <input className="input--style-3" type="email" name="email address"  id="inputEmail"
                          value={this.state.email} onChange={this.handleEmailChange} required
                          />
                      </div>
      
                      <div className="input-group d-inline ">
                           <h3 className="input-box push-up">Password</h3>  
                          <input className="input--style-3" type="password" id="inputPassword" name="password" 
                          value={this.state.password} onChange={this.handlePasswordChange} required
                          />
                      </div>
                     <div className="d-flex">
                     <div className="resized">
                        <Link to="/generate">
                          <p className="forgot">Forgot Password</p>
                        </Link> 
                      </div>
                      <div className="resized-right">
                          <Link className="forgot" to="/register">Register</Link>
                      </div>
      
                     </div>
      
                     <div >
                          <button className="login-button"  type="submit" > Login</button>
                      </div>
                    
      
                       </div>
                       <div className="reg-width">
                       <span id="_warning" className="d-none text-danger text-center">Username or Password not correct</span>
                          
                       </div>
                   </form>
                       
                      
                  </div>
            
                      </div>
                    </div>
                </div>
                
        
       
        
            )}
   
               
            </>
        )
    }
}
