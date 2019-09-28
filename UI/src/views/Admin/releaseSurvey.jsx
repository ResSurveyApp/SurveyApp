import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import IP from "../../Api";
import './RequestPage.css';

import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";
import axios from "axios";
import {
  companynames,
  companySurveyNames,
  departmentnames,
  
} from "../../services/adminService";
import Button from "../../components/CustomButton/CustomButton.jsx";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


class ReleseSurvey extends Component {
  state = {
    data: {
      companyName: "",
      surveyName: "",
      departmentName: ""
    },
    cmpnames: [],
    departementname: [],
    surveyname: []
  };
  async getcompanyname() {
    const  cmpnames = await companynames();
    this.setState({ cmpnames:cmpnames.data });
  }
  async getcompanySurveyNames(companyName) {
    const  surveyname = await companySurveyNames(companyName);
    this.setState({ surveyname : surveyname.data});
  }
  async getdepartmentNames(companyName, surveyName) {
    const  departementname  = await departmentnames(surveyName, companyName);
    this.setState({ departementname:departementname.data });
  }
  async componentDidMount() {
    await this.getcompanyname();
  }

  apiCall = async () => {
    let status = 400
    if(this.state.data.surveyName !== undefined && this.state.data.companyName !== undefined && this.state.data.departmentName !== undefined){
    await axios
    .post(`${IP}/releaseSurvey?survey=${this.state.data.surveyName}&company=${this.state.data.companyName}&department=${this.state.data.departmentName}&host=${window.location.hostname}`)
    .then(res => {
        status = res.status
      }
    ).catch(error => {
      status = 400
    });
  }else{
    status = 400
  }

    return status
    
  }
   onbtnclick=()=>{

    MySwal.fire({
      customClass: {
      popup: 'image-class',
      },
      title: 'Please Calm',
      text: 'Releasing Survey to Members',
      onBeforeOpen: () => {
          MySwal.showLoading()
          this.apiCall().then( (check) => {
          if(check === 200){
          MySwal.fire({
              customClass: {
              popup: 'image-class',
          },
          type: 'success',
          title: 'Survey Released',
          confirmButtonText: 'Close'
          })
        }else{
          MySwal.fire({
            customClass: {
            popup: 'image-class',
        },
        type: 'error',
        title: 'OOPS....',
        text: 'Releasing Survey Failed',
        confirmButtonText: 'Close'
        })
        }
      })
  }
})
   }
  
  getcompanyInfromation() {
    if(this.state.cmpnames!=undefined)
    return (this.state.cmpnames.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    )))
  }

  change = async event => {
    const data = { ...this.state.data };
    data.companyName = event.target.value;
    this.setState({ data });
    console.log(event.target.value)
    console.log(this.state.data, "HHHHHHH")
    await this.getcompanySurveyNames(event.target.value);
  };
  onsurveynamechange = async event => {
    const data = { ...this.state.data };
    data.surveyName = event.target.value;
    this.setState({ data });
    await this.getdepartmentNames(this.state.data.companyName,event.target.value);
  };
  ondepartmentchange = async event => {
    const data = { ...this.state.data };
    data.departmentName = event.target.value;
    this.setState({ data });
   
  };
  
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Release Survey"
                content={
                  <form>
                    <div class="form-group">
                      <label for="sel3">Company Name</label>
                
                      <select
                        class="form-control"
                        id="companyname"
                        onChange={this.change}
                      >
                        <option value="" />
                        {this.getcompanyInfromation()}
                      </select>
                
                    </div>
                    <div class="form-group">
                      <label for="sel1">Survey Name</label>

                      <select
                        class="form-control"
                        id="surveyname"
                        onChange={this.onsurveynamechange}
                      >
                        <option value="" />
                        {this.state.surveyname.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="sel2">Department Name</label>
                      <select
                        multiple
                        class="form-control"
                        id="departementname"
                        onChange={this.ondepartmentchange}
                      >
                        <option value="" />
                        {this.state.departementname.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                    
                     
                      <button
                      className="btn-fill pull-right btn btn-info"
                      type="button"
                      onClick={this.onbtnclick}
                    >
                    Release Survey
                    </button>
                    </div>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ReleseSurvey;
