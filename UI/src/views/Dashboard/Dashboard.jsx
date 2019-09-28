import React, { Component } from "react";
// import ChartistGraph from "react-chartist";
import { Grid, Row } from "react-bootstrap";

import { Link } from "react-router-dom";

import { getSurvey } from "../../services/userServices";
import SimpleDialogWrapped from "./Multiple_survey";

class Dashboard extends Component {

  state = {
    error: false,
    multipleSurvey : false,
    allSurvey : [],
    open : true,
    selectedSurvey : '',
  }

  handleClose = () => {
    let survey
    if(this.state.selectedSurvey !== ''){
      this.setState({ multipleSurvey : false, errro: false });
      survey = this.state.selectedSurvey
      survey = survey.split(" -")
      sessionStorage.setItem('survey',survey[0]);
    }else{
      this.setState({ error : true });
    }
  };

  handleChange = event => {
    this.setState({ selectedSurvey: event.target.value });
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  async componentDidMount(){

    const users = JSON.parse(sessionStorage.getItem("userDetails"))
    const company = sessionStorage.getItem("company")

    const data = await getSurvey(users.email, company)

    if(data.status === 200 && data.data.length > 1){
      this.setState({ multipleSurvey : true , allSurvey : data.data})
    }

  }

  render() {
    return (
      <div className="content">
        <SimpleDialogWrapped
          error = {this.state.error}
          allSurvey={this.state.allSurvey}
          selectedSurvey={this.state.selectedSurvey}
          open={this.state.multipleSurvey}
          handleClose={this.handleClose}
          handleChange={this.handleChange.bind(this)}
        />
        <Grid fluid>
          <Row>
            <div className="row justify-content-center">
              <div className="col-md-3">
                <div className="card">
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#b7efeb", height: "80px" }}
                  >
                    <p className="text-center" style={{ paddingTop: "30px" }}>
                      Robustness
                    </p>
                  </div>
                  <div className="card-body">
                    {/* <h4 className="card-title">Special title treatment</h4> */}
                    <p align="justify" className="card-text">
                        The ability of systems, system elements, 
                        and other units of analysis to withstand 
                        disaster forces without significant degradation 
                        or loss of performance.<br/><br/>
                    </p>

                    <Link to="/users/survey?R1" className="btn btn-primary">
                      Go
                    </Link>
                  </div>
                  {/* <div className="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "60%" }}
                    >
                      60%
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#b7efeb", height: "80px" }}
                  >
                    <p className="text-center" style={{ paddingTop: "30px" }}>
                      Redundancy
                    </p>
                  </div>
                  <div className="card-body">
                    {/* <h4 className="card-title">Special title treatment</h4> */}
                    <p align="justify" className="card-text">
                    The extent to which systems, system elements, or other units are substitutable, 
                    that is, capable of satisfying functional requirements, if significant degradation or loss of functionality occurs
                    </p>
                    <Link to="/users/survey?R2" className="btn btn-primary">
                      Go
                    </Link>
                  </div>
                  {/* <div className="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "70%" }}
                    >
                      70%
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#b7efeb", height: "80px" }}
                  >
                    <p className="text-center" style={{ paddingTop: "30px" }}>
                      Resourcefulness
                    </p>
                  </div>
                  <div className="card-body">
                    {/* <h4 className="card-title">Special title treatment</h4> */}
                    <p align="justify" className="card-text">
                    The ability to diagnose and prioritize problems and to initiate 
                    solutions by identifying and mobilizing material, monetary, informational, 
                    technological, and human resources.
                    </p>
                    <Link to="/users/survey?R3" className="btn btn-primary">
                      Go
                    </Link>
                  </div>
                  {/* <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "80%" }}
                    >
                      80%
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div
                    className="card-header text-white"
                    style={{ backgroundColor: "#b7efeb", height: "80px" }}
                  >
                    <p className="text-center" style={{ paddingTop: "30px" }}>
                      Rapidity
                    </p>
                  </div>
                  <div className="card-body">
                    {/* <h4 className="card-title">Special title treatment</h4> */}
                    <p align="justify" className="card-text">
                    The capacity to restore functionality in a timely way 
                    containing losses and avoiding disruptions.<br/><br/><br/><br/>
                    </p>
                    <Link to="/users/survey?R4" className="btn btn-primary">
                      Go
                    </Link>
                  </div>
                  {/* <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "100%" }}
                    >
                      100%
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
