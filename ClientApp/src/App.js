import React, { useState } from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import About from './components/About';
import Admin from './components/Admin';
import Body from './components/Body';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register'
import Studiofind from './components/Studiofind';
import Generate from './components/Generate';
import Forgot from './components/Forgot';






function App() {

  const authentication = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
 
  }


  return (
   <>
   <Switch>
      { authentication && <Route exact path='/' component={Body} /> }
      <Route exact path='/about' component={About} />
      <Route exact path='/admin' component={Admin}/>
      <Route exact path='/blog' component={Blog} />
      <Route exact path='/contact' component={Contact} />
      <Route exact path='/forgot' component={Forgot} />
      <Route exact path='/generate' component={Generate} />
      <Route exact path='/login' component={Login}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/studiofind' component={Studiofind}/>
     
   </Switch>
   </>
  );
}

export default App;

