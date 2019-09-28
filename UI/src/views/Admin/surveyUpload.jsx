import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
import axios from "axios";
import IP from "../../Api";


import { Card } from "../../components/Card/Card.jsx";
import DialogBox from "../../components/Dialog/Dialog.jsx"
// const express = require("express");
// const fileUpload = require("express-fileupload");
// const app = express();

class SurveyUpload extends Component {
  state = {
    OpenA: false,
    OpenB: false,
    data: {
      Survey_name: "",
      company_name: "",
      file_name: ""
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleselectedFile = event => {
    console.log(event.target.files[0]);
    // const formData = new FormData();

    // formData.append("file", event.target.files[0]);
     const data = { ...this.state.data };
    data[event.target.id] = event.target.files[0];
    console.log(data)
    this.setState({
      data
    });
  //   const formData = new FormData();

  // formData.append("file", event.target.files[0]);

  // axios
  //   .post(`${IP}/questionsUpload?survey=sdfsdf&company=dfsdf`, formData)
  //   .then(res => console.log(res));
  

    // default options
    // app.use(fileUpload());

    // app.post("/upload", function(req, res) {
    //   if (Object.keys(req.files).length == 0) {
    //     return res.status(400).send("No files were uploaded.");
    //   }

    //   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    //   let sampleFile = req.files.sampleFile;

    //   // Use the mv() method to place the file somewhere on your server
    //   sampleFile.mv("/somewhere/on/your/server/filename.jpg", function(err) {
    //     if (err) return res.status(500).send(err);

    //     res.send("File uploaded!");
    //   });
    // });
  };
  // copyFile = (src, dest) => {
  //   let readStream = fs.createReadStream(src);

  //   readStream.once("error", err => {
  //     console.log(err);
  //   });

  //   readStream.once("end", () => {
  //     console.log("done copying");
  //   });

  //   readStream.pipe(fs.createWriteStream(dest));
  // };
  doSubmit = async () => {
    // const formData = new FormData();

    // formData.append("file", this.state.data.file_name);
    // await surveyUpload(
    //   this.state.data.Survey_name,
    //   this.state.data.company_name,
    //   formData
    // );
    const formData = new FormData();

  formData.append("file", this.state.data.file_name);
  axios
    .post(`${IP}/questionsUpload?survey=${this.state.data.Survey_name}&company=${this.state.data.company_name}`, formData)
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

  handleClose = async() => {
    this.setState({ OpenB : false, OpenA : false, data : { Survey_name : "", company_name : ""  }})
    document.getElementById("file_name").value = "";
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Survey Upload"
                content={
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
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

                    <div className="form-group">
                      <label htmlFor="exampleFormControlFile1">
                        Upload Survey
                      </label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="file_name"
                        onChange={this.handleselectedFile}
                      />
                    </div>

                    <button
                      className="btn-fill pull-right btn btn-info"
                      type="button"
                      onClick={this.doSubmit}
                    >
                      Upload Survey
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

export default SurveyUpload;
