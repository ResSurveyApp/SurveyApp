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

import { userRegistration } from "../../services/userServices";
import DialogBox from "../../components/Dialog/Dialog.jsx"

class UserRegistraion extends Component {

  state = {
    email: '',
    username:'',
    password:'',
    cpassword:'',
    company:'',
    survey:'',
    handleLog : false,
    loggedIn : false,
    OpenA : false,
    block : false
  }

  componentDidMount(){
    let val = this.props.location.search.replace('?', '')
    val = val.split('&')
    let company, survey, email
    for ( var k of val){
      k = k.split('=')
      if(k[0] === 'company'){
        company = k[1].split('%20').join(' ')
      }else if ( k[0] === 'survey'){
        survey = k[1].split('%20').join(' ')
      }else if( k[0] == 'email'){
        email = k[1].split('%20').join(' ')
      }
    }
    console.log(val.length )
    if(val.length > 1){
      this.setState({ survey, company, email, block: true })
    }
  }

  handleClick = () => {
    console.log("Button Clicked")

    this.APICall();
  
  }

  async APICall(){
  const  Physical = await userRegistration(
    this.state.survey,
    this.state.company,
    this.state.email,
    this.state.username,
    this.state.password
  );

  console.log(Physical)
  if(Physical.data.status === "200" && Physical.status === 200){
    this.setState({ handleLog : true})
  }else{
    this.setState({ OpenA : true })
  }
}

handleClose = async() => {
  this.setState({ OpenA : false})
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
                  title="Validate and Registration"
                  content={
                    <form>
                    <div class="form-group">
                        <label for="exampleInputEmail">Email</label>
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
                          placeholder="Please Enter Email"
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Survey</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled={this.state.block}
                          value={this.state.survey}
                          onChange={this.handleChange('survey')}
                          id="survey"
                          placeholder="Please Enter Email"
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">UserName</label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.username}
                          onChange={this.handleChange('username')}
                          id="user"
                          placeholder="Please Enter Your Name"
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
                      </div>
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
                        <Button bsStyle="info" pullRight fill type="button" onClick={this.handleClick}>
                          Register
                        </Button>
                        {( this.state.handleLog && !this.state.OpenA )? <DialogBox handleClose={this.handleRedirect} condition={this.state.handleLog} main="Alert!!!" content="Registration Successfull"/> : <DialogBox handleClose={this.handleClose} condition={this.state.OpenA} main="Alert!!!" content="Registration Failed"/>}
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
