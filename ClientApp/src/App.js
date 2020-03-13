import React, { useState } from 'react';
import Login from './components/Login';
import Body from './components/Body';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Studiofind from './components/Studiofind';
import Register from './components/Register'
import Admin from './components/Admin';



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
      <Route exact path='/studiofind' component={Studiofind}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
   </Switch>
   </>
  );
}

export default App;

