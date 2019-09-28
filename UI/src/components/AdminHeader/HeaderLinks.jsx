import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class HeaderLinks extends Component {

  handleClick = () =>{
    this.props.onLogout();
  }
  
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Admin</p>
          </NavItem>
          {/* <NavItem eventKey={1} href="#">
            Account
          </NavItem> */}
          {/* <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem> */}
        </Nav>
        <Nav pullRight>
          {/* <NavItem eventKey={1} href="#">
            Account
          </NavItem> */}
          {/* <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown> */}
          <NavItem eventKey={3} onClick={this.handleClick} href='/'>
            Log out
          </NavItem>
          {/* {!this.props.logout ? <Redirect to='/'/>: null} */}
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    logout : state.auth.registered
    // onError:()=> dispatch(actions.authFail({message:null})),
    // onTryAutoSignUp: ()=> dispatch(actions.authCheckState())
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onLogout: () => dispatch(actions.logout()),
    // onError:()=> dispatch(actions.authFail({message:null})),
    // onTryAutoSignUp: ()=> dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);
