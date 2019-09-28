import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Rdata from './Rvalue';

import { Card } from "../../components/Card/Card.jsx";

import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import {Pie, Bar, Radar} from 'react-chartjs-2';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const options = {
  responsive: true,
  legend: {
      display: true,
      labels: {
          fontColor: 'rgb(44, 99, 132)'
      },
      "position": "bottom",
  }
}

const baroptions = {
  responsive: true,
  legend: {
      display: true,
      labels: {
          fontColor: 'rgb(44, 99, 132)'
      },
      "position": "top",
  },scales: {
    yAxes: [
      {
  ticks: {
    min: 0,
    maxTicksLimit: 5
  }}]
}
}

const singleradaroptions = {
responsive: true,
legend: {
    display: true,
    labels: {
        fontColor: 'rgb(44, 99, 132)'
    },
    "position": "bottom",
},scale: {
ticks: {
  min: 0,
  // maxTicksLimit: 8,
}
}
}

const radaroptions = {
responsive: true,
legend: {
    display: true,
    labels: {
        fontColor: 'rgb(44, 99, 132)'
    },
    "position": "bottom",
},scale: {
ticks: {
  beginAtZero: true
}
}
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const data = {
  labels: ['Physical', 'organizational', 'Technical'],
  datasets: [
    {
      label: 'R1',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [234,222,100]
    }
  ]
}


const pxToMm = (px) => {
  return Math.floor(px/document.getElementById('content').offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById('content').offsetHeight*mm;
};

const range = (start, end) => {
  return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
};


const printDocument = () => {


    const input = document.getElementById('content');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm',[canvas.width,canvas.height], 'true');
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight,'','FAST');
        pdf.save('download.pdf');
      })
    ;
}

const AlertDialogSlide = (props) => {
  // state = {
  //   open: false,
  // };

  // handleClickOpen = () => {
  //   props.setState({ open: true });
  // };

  // handleClose = () => {
  //   props.setState({ open: false });
  // };
    return (
        <Dialog
          open={props.open}
          maxWidth={'lg'}
          TransitionComponent={Transition}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Admin Reports"}
          </DialogTitle>
          <DialogContent>
            <br/>
            <div id="content">
              <Grid fluid>
          <Row>
            {props.state.surveys.map( survey => (
              <Col md={6}>
              <Card
                title={Rdata(survey)}
                content={
                        <Bar data={props.state['bar'+survey]} options={baroptions}/>
                }
              />
            </Col>
            ))}
            <Col md={6}>
              <Card
                title="Resilience Polar Chart"
                content={
                        <Pie data={props.state.piedata} options={options}/>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Summary"
                content={
                        <Radar data={props.state.singleradar} options={singleradaroptions}/>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="Resilience Spider Chart"
                content={
                        <Radar data={props.state.radar} options={radaroptions}/>
                }
              />
            </Col>
            {props.state.surveys.map( survey => (
            <Col md={6}>
              <Card
                title={Rdata(survey)}
                content={
                        <Radar data={props.state['radar'+survey]} options={radaroptions}/>
                }
              />
            </Col>
            ))}
          </Row>
          </Grid>
        </div>
        <Button variant="raised" style={{float : "left"}} onClick={printDocument} className="Newbutton">Download Report</Button>
        
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

export default AlertDialogSlide;