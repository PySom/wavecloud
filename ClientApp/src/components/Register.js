import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from "react-router-dom";




export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          name: '',
          email:'',
          password: '',
          confirm: '',
          Authentication: false
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    
      }
    
     
      handleNameChange(e) {
        this.setState({...this.state, name: e.target.value})
    
  }  
    
     handleEmailChange(e) {
          this.setState({...this.state, email: e.target.value})
      
    }  
    
    handlePasswordChange(e) {
        this.setState({...this.state, password: e.target.value})
    }

    handleConfirmChange(e) {
        this.setState({...this.state, confirm: e.target.value})
    }

    submitForm(e) {
        const register = {
            FirstName: this.state.name, 
            Email: this.state.email,
            Password: this.state.password,
            ConfirmPassword: this.state.confirm
          }
        
        console.log(register)
        e.preventDefault();
          axios.post('/api/account/register', register).then(response => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('userdata', JSON.stringify(response.data))
          localStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin))
          let userdata = localStorage.getItem('userdata')
           this.setState({...this.state, error:userdata, Authentication:true});
        })
    
         .catch(err => {
            console.log(err)
            const warn = document.getElementById("_warning-reg");
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
        console.log("name", this.state.name)
        console.log("email",this.state.email)
        console.log( "password",this.state.password)
        console.log("confirm", this.state.confirm)
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

                         <div className="col-md-6 col-12 pad-register">
                         <div className="d-inline ">
                           <h3 className="login">Register</h3>
                           <div className="d-flex">
                                        <img className="login-right" src="images/loginfacebook.svg"/>
                                        <img className="login-right" src="images/logingoogle.svg"/>
                                        <img className="login-right" src="images/logintwitter.svg"/>
                                        <img className="login-right" src="images/logininstagram.svg"/>
                            </div>
                            <div className="resized">
                                <p className="resized-p">or use your account </p>
                            </div>
                            <form className="form-width" method="POST" onSubmit={this.submitForm}>  
                             <div className="pad-account">
            
                             <div className="input-group d-inline">
                                 <h3 className="input-box">Name</h3>  
                                <input className="input--style-3" type="text" name="name"  id="inputText"
                                value={this.state.name} onChange={this.handleNameChange} required
                                />
                            </div>
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
                            <div className="input-group d-inline ">
                                 <h3 className="input-box push-up">Confirm Password</h3>  
                                <input className="input--style-3" type="password" id="inputConfirm" name="confirm" 
                                value={this.state.confirm} onChange={this.handleConfirmChange} required
                                />
                            </div>
                           <div className="d-flex">
                           <div className="resized">
                                <p className="forgot">Forgot Password</p>
                            </div>
                            <div className="resized-right">
                                <Link  className="forgot" to="/login">
                               Login
                                </Link>
                               
                            </div>
            
                           </div>
            
                           <div >
                                <button className="login-button"  type="submit" > Register</button>
                            </div>
                          
            
                             </div>
                             <div className="container">
                             <div className="reg-width row">
                             <span id="_warning-reg" className="d-none text-danger text-center ">Username already exists or Passwords doesn't match</span>
                         
                             </div>
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
