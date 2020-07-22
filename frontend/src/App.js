import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';
import CreatePost from './components/screens/Create-Post';

function App() {

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/create-post" component={CreatePost}></Route>
            <Redirect from="*"  to="/"></Redirect>
          </Switch>
        </Suspense>
      </Router>
    </>
  )

}

export default App;
