import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
              <Link to="/" className="simple-text logo-normal">
                Home
              </Link>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
