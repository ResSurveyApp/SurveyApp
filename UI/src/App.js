import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ValidateLogin from "./components/userComponent/loginForm";
import Login from "./components/userComponent/login";
import UserRegistraion from "./components/userComponent/userRegistration";
import UserReset from "./components/userComponent/userReset";

import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import UserDashboard from "./layouts/Dashboard/Dashboard.jsx";
import AdminDashboard from "./layouts/Dashboard/adminDashboard.jsx";

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

render(){

  let routes = (
    <Switch>
      <Route path="/uservalidate" component={ValidateLogin} />
      <Route path="/userregistration" component={UserRegistraion} />
      <Route path="/userreset" component={UserReset} />
      <Route exact path="/" component={Login} />
    </Switch>
  );

  if(this.props.isAdmin === 'true'){
    routes = (
      <Switch>
        <Route path="/admin" component={AdminDashboard}/>
        <Route exact path="/" component={Login} />
      </Switch>
    );
  }else if(this.props.registered === 'true'){
    routes = (
      <Switch>
        <Route path="/users" component={UserDashboard}/>
        <Route exact path="/" component={Login} />
      </Switch>
    );
  }

    return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>);
}
}

const mapStateToProps = state =>{
  return {
    isAdmin : state.auth.isAdmin,
    registered : state.auth.registered
  }
  }
  
  const mapDispatchToProps = dispatch => {
  return {
      onTryAutoSignUp: ()=> dispatch(actions.authCheckState())
  };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(App);