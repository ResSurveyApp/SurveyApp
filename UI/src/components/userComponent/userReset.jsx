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
import { Redirect } from "react-router-dom";

import { forgetPassword, otp } from "../../services/login";
import DialogBox from "../../components/Dialog/Dialog.jsx"

class UserRegistraion extends Component {

  state = {
    email: '',
    password:'',
    cpassword:'',
    company:'',
    otp:'',
    handleLog : false,
    handleLog1 : false,
    handleLogR : false,
    loggedIn : false,
    OpenA : false,
    block : false
  }

  componentDidMount(){
    let val = this.props.location.search.replace('?', '')
    val = val.split('&')
    let company, survey
    for ( var k of val){
      k = k.split('=')
      if(k[0] === 'company'){
        company = k[1].replace('%20', '')
      }else if ( k[0] === 'survey'){
        survey = k[1].replace('%20', '')
      }
    }
    console.log(val.length )
    if(val.length > 1){
      this.setState({ survey, company, block: true })
    }
  }

  handleClick = (check) => {
    console.log("Button Clicked", check)

    if(check === 'Send OTP'){
      this.OTPCall();
    }else{
      this.ResetCall();
    }
  
  }

  async OTPCall(){
  const api = await otp(
    this.state.email,
    this.state.company
  );

  console.log(api)
  
  if(api.status === 200){
    this.setState({ handleLog : true, handleLog1 : true,  block: true})
  }else{
    this.setState({ OpenA : true })
  }
}

async ResetCall(){
  const api = await forgetPassword(
    this.state.email,
    this.state.password,
    this.state.company,
    this.state.otp
  );

  console.log(api)
  
  if(api.status === 200){
    this.setState({ handleLogR : true})
  }else{
    this.setState({ OpenA : true })
  }
}

handleClose = async() => {
  this.setState({ OpenA : false, handleLog1 : false})
}

handleRedirect = async() => {
  this.setState({ loggedIn : true})
}

handleChange = name => event => {
  if(name === 'cpassword'){
  this.setState({ [name] : event.target.value})
  }else{
    this.setState({ [name] : event.target.value })
  }
}

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };

    let authRedirect = null

    let buttonText = null

    if(this.state.handleLog === true){
      buttonText = 'Register'
    }else{
      buttonText = 'Send OTP'
    }

    if(this.state.loggedIn === true){
      authRedirect = <Redirect to='/' />
    }
    return (
      <React.Fragment>
        {authRedirect}
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
          <Grid fluid>
            <Row>
              <Col
                md={4}
                style={{ float: "right", marginRight: "50%", top: "50px" }}
              >
                <Card
                  title="Reset Your Password"
                  content={
                    <form>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Email</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.email}
                          disabled={this.state.block}
                          onChange={this.handleChange('email')}
                          id="email"
                          placeholder="Please Enter Email"
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Company</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.company}
                          disabled={this.state.block}
                          onChange={this.handleChange('company')}
                          id="comapny"
                          placeholder="Please Enter Company"
                        />
                      </div>
                      { this.state.handleLog ?
                      <div><div class="form-group">
                        <label for="OTP">OTP</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.otp}
                          onChange={this.handleChange('otp')}
                          id="otp"
                          placeholder="Please enter the OTP which you have received"
                        />
                      </div> 
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          value={this.state.password}
                          onChange={this.handleChange('password')}
                          id="exampleInputPassword1"
                          placeholder="Password"
                        />
                      </div> </div>: null
                      }
                      {/* <div class="form-group">
                        <label for="ConfirmPassword">Confirm Password</label>
                        <input
                          type="password"
                          class="form-control"
                          value={this.state.cpassword}
                          onChange={this.handleChange('cpassword')}
                          id="ConfirmPassword"
                          placeholder="Confirm Password"
                        />
                      </div> */}
                      <Link to="/">
                      <Button bsStyle="info" fill type="button">
                          Go to Login
                      </Button>
                      </Link>
                        <Button bsStyle="info" pullRight fill type="button" onClick={()=>this.handleClick(buttonText)}>
                          {buttonText}
                        </Button>
                        {console.log(this.state.handleLog, this.state.handleLogR, !this.state.OpenA, "check")}
                        {( this.state.handleLog1 && !this.state.OpenA )? <DialogBox handleClose={this.handleClose} condition={this.state.handleLog1} main="Alert!!!" content="OTP Sent. Please check your mail!!"/> : <DialogBox handleClose={this.handleClose} condition={this.state.OpenA} main="Alert!!!" content="OTP Failed to Sent"/>}
                        {( this.state.handleLogR && !this.state.OpenA )? <DialogBox handleClose={this.handleRedirect} condition={this.state.handleLogR} main="Alert!!!" content="Password Reset Successfull"/> : <DialogBox handleClose={this.handleClose} condition={this.state.OpenA} main="Alert!!!" content="Password Reset Failed"/>}
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default UserRegistraion;
