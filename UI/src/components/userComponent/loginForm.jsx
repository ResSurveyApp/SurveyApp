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

import { companynames } from "../../services/userServices";

class UserProfile extends Component {

  state = {
    loggedIn : false
  }

  handleClick = () => {
    console.log("Button Clicked")

    this.APICall();
  
  }

  async APICall(){
  const  Physical = await companynames(
    "MySurvey",
    "CGI",
    "R1",
    "Physical"
  );
  if(Physical.status === 200){
    this.setState({ loggedIn : true})
  }
}

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    return (
      <React.Fragment>
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
                  title=" Validate and Login"
                  content={
                    <form>
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Email Id",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Please Enter Email",
                            defaultValue: ""
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "company Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Please Enter company Name",
                            defaultValue: ""
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "Department",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Please Enter Department Name",
                            defaultValue: ""
                          }
                        ]}
                      />

                      {/* <Link to="/userregistration"> */}
                        <Button bsStyle="info" pullLeft fill type="button" onClick={this.handleClick}>
                          Validate and Login
                        </Button>
                      {/* </Link> */}

                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
          {this.state.loggedIn ? <Redirect to='/userregistration' /> : null}
        </div>
      </React.Fragment>
    );
  }
}

export default UserProfile;
