import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Dropdown extends Component {

    getUser(){
        if (localStorage.getItem('userdata')) {
            return JSON.parse(localStorage.getItem('userdata'));
        }
    }
    
    
     handleLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userdata');
    }

    
    render() {
        return (
            <div class="dropdown dropdown user-drop">
            <button class="dropbtn">Welcome {this.getUser().firstName}
            </button>
            <img  className="cart-resized" src="images/caret.png" style={{width:"5.2%"}}/>
           <div class="dropdown-content">
           <Link to="/profile">Profile</Link>
           <Link onClick={this.handleLogout} to="/">Log out</Link>
           </div>
           </div>
        )
    }
}

