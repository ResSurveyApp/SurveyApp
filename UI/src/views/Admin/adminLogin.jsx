import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";

import Button from "../../components/CustomButton/CustomButton.jsx";
import { Link } from "react-router-dom";
import imagine from "../../assets/img/sidebar-2.jpg";
import logo from "../../assets/img/resiliense.png";

class AdminLogin extends Component {
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
          <div className="sidebar-wrapper">
            <ul className="nav" />
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
                  title="Login"
                  content={
                    <form>
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            label: "User ID",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Please Enter User Id",
                            defaultValue: ""
                          }
                        ]}
                      />
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          placeholder="Password"
                        />
                      </div>

                      <Button bsStyle="info" pullRight fill type="submit">
                        Login
                      </Button>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
          >
        </div>
      </React.Fragment>
    );
  }
}

export default AdminLogin;
