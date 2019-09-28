import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "../Card/Card.jsx";
import { FormInputs } from "../FormInputs/FormInputs.jsx";
import Button from "../CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";
import imagine from "../../assets/img/sidebar-2.jpg";
import logo from "../../assets/img/resiliense.png";
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from "../Dialog/Dialog";
import { Redirect } from "react-router-dom";

//REDUX
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class Login extends Component {

  state = {
    email : '',
    password : ''
  }

  componentDidMount(){
    console.log("CHECKK ON AUTO SIGNUP")
    this.props.onTryAutoSignUp();
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password);
  }

  handleChange = name => event => {
      this.setState({ [name] : event.target.value })
  }

  handleClose = () => {
    this.props.onError()
    // this.setState({ open : false})
  }

  render() {

    let authRedirect=null;

    if(this.props.isAdmin === 'true'){
      authRedirect = <Redirect to='/admin' />
    }else if(this.props.registered === 'true'){
      authRedirect = <Redirect to='/users/dashboard' />

      // MySwal.fire({
      //   title: 'Select field validation',
      //   input: 'select',
      //   inputOptions: {
      //     '0': 'Apples',
      //     '1': 'Bananas',
      //     '2': 'Grapes',
      //     '3': 'Oranges'
      //   },
      //   inputPlaceholder: 'Select a fruit',
      //   showCancelButton: true,
      //   inputValidator: (value) => {
      //     console.log(value,"CCC")
      //     return new Promise((resolve) => {
      //       resolve()
      //     })
      //   }
      // })
    }

    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    return (
      <React.Fragment>
      {authRedirect}
      {console.log(authRedirect, this.props.isAdmin, this.props.registered)}
        <div
          id="sidebar"
          className="sidebar"
          data-color="black"
          data-image={imagine}
        >
          <div className="sidebar-background" style={sidebarBackground} />
          <div className="logo">
            <Link to="/" className="simple-text logo-normal">
              <div className="logo-img">
                <img src={logo} alt="logo_image" style={{ width: "180px" }} />
              </div>
            </Link>
          </div>
        </div>
        <div className="content">
        {this.props.loading?<LinearProgress/>:""}
          <Grid fluid>
            <Row>
              <Col
                md={4}
                style={{ float: "right", marginRight: "50%", top: "50px" }}
              >
                <Card
                  title="Login"
                  content={
                    <form>
                      <div class="form-group">
                        <label for="inputEmail">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          id="email"
                          placeholder="Please Enter Email"
                          onChange={this.handleChange('email')}
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                          onChange={this.handleChange('password')}
                        />
                      </div>
                        <Button bsStyle="info" fill size="lg" block type="button" onClick={this.submitHandler}>
                          Login
                        </Button>
                        <br/>
                        <Link to="/userregistration">
                      <Button bsStyle="primary" fill type="button">
                          SignUp
                      </Button>
                      </Link>
                      <Link to="/userreset">
                      <Button bsStyle="danger" pullRight fill type="button">
                          Forget Password
                      </Button>
                      </Link>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
          {this.props.error ?  <Dialog handleClose={this.handleClose} condition={this.props.error.message} main="Alert!!!" content={this.props.error.message}/>: null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state =>{
  return {
    loading : state.auth.loading,
    error : state.auth.error,
    isAdmin : state.auth.isAdmin,
    registered : state.auth.registered
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onAuth: (email,password) => dispatch(actions.auth(email,password)),
    onError:()=> dispatch(actions.authFail({message:null})),
    onTryAutoSignUp: ()=> dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
