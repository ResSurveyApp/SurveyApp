import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";

import { surveyUpload } from "../../services/adminService";
import axios from "axios";
import { userdataupload } from "../../services/adminService";

import DialogBox from "../../components/Dialog/Dialog.jsx"
import IP from "../../Api";

class UserUpload extends Component {
  state = {
    OpenA : false,
    OpenB : false,
    data: {
      Survey_name: "",
      company_name: "",
      file_name: {}
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleClose = async() => {
    this.setState({ OpenB : false, OpenA : false, data : { Survey_name : "", company_name : ""  }})
    document.getElementById("file_name").value = "";
  }

  handleselectedFile = event => {
    console.log(event);
    // const formData = new FormData();

    // formData.append("file", event.target.files[0]);
     const data = { ...this.state.data };
    data[event.target.id] = event.target.files[0];
    this.setState({
      data
    });
  }
  doSubmit = async () => {
    const formData = new FormData();

    formData.append("file", this.state.data.file_name);

    // const Check = await userdataupload(this.state.data.Survey_name, this.state.data.company_name, formData)
    
    // console.log("Checkiung", Check)
  
    axios
    .post(`${IP}/usersUpload?survey=${this.state.data.Survey_name}&company=${this.state.data.company_name}`, formData)
    .then(res => {
      if(res.status === 200){
        this.setState({ OpenA : true ,})
      }else{
        this.setState({ OpenB : true ,})
      }
      }).catch(error=> {
        this.setState({ OpenB : true})
      });
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="User Data Upload"
                content={
                  <form>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label className="control-label">Survey Name</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Survey Name"
                            name="Survey_name"
                            value={this.state.data.Survey_name}
                            label="Survey Name"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label className="control-label">Company Name</label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Comapany Name"
                            name="company_name"
                            value={this.state.data.company_name}
                            label="Company Name"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlFile1">Upload Users</label>
                      <input
                        type="file"
                        class="form-control-file"
                        id="file_name"
                        onChange={this.handleselectedFile}
                      />
                    </div>
                    <button
                      className="btn-fill pull-right btn btn-info"
                      type="button"
                      onClick={this.doSubmit}
                    >
                      Upload Users
                    </button>

                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
        { this.state.OpenA ? <DialogBox handleClose={this.handleClose} condition={this.state.OpenA} main="Upload Alert!!!" content="Your file has been uploaded sucessfully."/> 
        : <DialogBox handleClose={this.handleClose} condition={this.state.OpenB} main="Upload Alert!!!" content="File has been failed to upload, Please Try again"/>}
      </div>
    );
  }
}

export default UserUpload;
