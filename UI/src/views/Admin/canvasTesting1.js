import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";
// import axios from "axios"
import { Card } from "../../components/Card/Card.jsx";
import {Doughnut} from 'react-chartjs-2';
import {Pie, Bar, Radar} from 'react-chartjs-2';

import DetailedExpansionPanel from '../../components/qutions/Expansion';

import { UserGraphsCount } from "../../services/graphService";

import radarchek from './check';
import Rdata from './Rvalue';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';



import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

const pxToMm = (px) => {
  return Math.floor(px/document.getElementById('content').offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById('content').offsetHeight*mm;
};

const range = (start, end) => {
  return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
};

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
    beginAtZero: true,
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

const bar1 = ['rgba(255,99,132,0.2)', 'rgba(28,21,231,0.2)', 'rgba(227,229,7,0.2)']
const bgbar1 = ['rgba(255,99,132,1)', 'rgba(28,21,231,1)', 'rgba(227,229,7,1)']
const borderbar1 = ['rgba(255,99,132,0.4)', 'rgba(28,21,231,0.4)', 'rgba(227,229,7,0.4)']

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

const pie = {
  labels: ['R1','R2','R3'],
  datasets: [{
    data: [40,50,27],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#EFDD56',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#EFDD56',
    '#FFCE56'
    ]
  }],
}

const radar = {
  labels: [],
      datasets: [
        {
          label: 'Categories',
          backgroundColor: 'rgba(255,99,132,0.4)',
          borderColor: 'rgba(255,99,132,0.7)',
          pointBackgroundColor: 'rgba(255,99,132,0.7)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,0.7)',
          data: []
        }
      ]
}

// const newss = {
//   category: ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7", "cat8", "cat9", "cat10", "cat11", "cat12", "cat13", "cat14", "cat15", "cat16", "cat17", "cat18", "cat19", "cat20", "cat21", "cat22", "cat23", "cat24", "cat25", "cat26", "cat27", "cat28"],
//   scores : [3.0, 1.0, 3.0, 3.0, 3.0, 2.0, 2.3333333333, 3.0, 3.0, 1.0, 1.5, 2.5, 4.0, 2.0, 1.5, 2.0, 2.0, 5.0, 2.5, 2.0, 2.0, 1.5, 2.0, 2.0, 5.0, 2.5, 2.0, 2.0]
// }

class GraphsDisplay extends Component {

  state ={

    surveys : ['R1','R2','R3', 'R4'],
    graphType : ['Pie', 'Bar', 'Radar', 'RadarBySector', 'RadarAllSectors'],
    piedata :{ },
    bardata : { },
    radar:{},
    singleradar:{},
    radarR1:{labels: [],
      datasets: [
        {
          label: 'R1',
          backgroundColor: 'rgba(255,99,132,0.4)',
          borderColor: 'rgba(255,99,132,0.7)',
          pointBackgroundColor: 'rgba(255,99,132,0.7)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,0.7)',
          data: []
        }
      ]},
      radarR2:{labels: [],
      datasets: [
        {
          label: 'R2',
          backgroundColor: 'rgba(28,21,231,0.2)',
          borderColor: 'rgba(28,21,231,0.7)',
          pointBackgroundColor: 'rgba(28,21,231,0.7)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(28,21,231,0.7)',
          data: []
        }
      ]},
      radarR3:{labels: [],
      datasets: [
        {
          label: 'R3',
          backgroundColor: 'rgba(227,229,7,0.2)',
          borderColor: 'rgba(227,229,7,0.7)',
          pointBackgroundColor: 'rgba(227,229,7,0.7)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(227,229,7,0.7)',
          data: []
        }
      ]},
      radarR4:{labels: [],
      datasets: [
        {
          label: 'R4',
          backgroundColor: 'rgba(236,173,77,0.2)',
          borderColor: 'rgba(236,173,77,0.7)',
          pointBackgroundColor: 'rgba(236,173,77,0.7)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(236,173,77,0.7)',
          data: []
        }
      ]},
    barR1: { labels: ['Physical', 'organizational', 'Technical'],
            datasets: [
              {
                
                label: 'R1',
                backgroundColor:bar1,
                borderColor: bgbar1,
                borderWidth: 1,
                hoverBackgroundColor: borderbar1,
                hoverBorderColor: bgbar1,
                data: []
              }
            ]
          },
            barR2: { labels: ['Physical', 'organizational', 'Technical'],
            datasets: [
              {
                label: 'R2',
                backgroundColor:bar1,
                borderColor: bgbar1,
                borderWidth: 1,
                hoverBackgroundColor: borderbar1,
                hoverBorderColor: bgbar1,
                data: []
              }
            ]
          },
            barR3: { labels: ['Physical', 'organizational', 'Technical'],
            datasets: [
              {
                label: 'R3',
                backgroundColor:bar1,
                borderColor: bgbar1,
                borderWidth: 1,
                hoverBackgroundColor: borderbar1,
                hoverBorderColor: bgbar1,
                data: []
              }
            ]
          },
            barR4: { 
              labels: ['Physical', 'organizational', 'Technical'],
          datasets: [
            {
              label: 'R4',
              backgroundColor:bar1,
              borderColor: bgbar1,
              borderWidth: 1,
              hoverBackgroundColor: borderbar1,
              hoverBorderColor: bgbar1,
              data: []
            }
          ] },
  }

  // async APICall(key){
  //   const users = JSON.parse(sessionStorage.getItem("userDetails"))
  //   const datas = await UserGraphsCount(
  //     key,
  //     sessionStorage.getItem('survey'),
  //     sessionStorage.getItem('company'),
  //     '' + users.userid
  //   );
  // }

  async componentDidMount() {

    const users = JSON.parse(sessionStorage.getItem("userDetails"))
    MySwal.fire({
      customClass: {
      popup: 'image-class',
      },
      title: 'Please Wait',
      allowOutsideClick: false,
      onBeforeOpen: () => {
          MySwal.showLoading()
    }
  })

    // const val = this.state.graphType.map( key => {
    //   return this.APICall(key)
    // })

    // console.log(val)

    // const piedatas = await UserGraphsCount('Pie',sessionStorage.getItem('survey'),sessionStorage.getItem('company'),"588");
    // let bardatas = await UserGraphsCount('Bar',sessionStorage.getItem('survey'),sessionStorage.getItem('company'),"588");
    // let radardatas = await UserGraphsCount('Radar',sessionStorage.getItem('survey'),sessionStorage.getItem('company'),"588");
    // let radarsingledatas = await UserGraphsCount('RadarBySector',sessionStorage.getItem('survey'),sessionStorage.getItem('company'),"588");
    // let radaralldatas = await UserGraphsCount('RadarAllSectors',sessionStorage.getItem('survey'),sessionStorage.getItem('company'),"588");

    // const state = this.state

    // console.log(state.PieDatas)

    
    // const datas = [...Object.values(this.state.check)]
    // const label = [...Object.keys(this.state.check)]

    const Pie = await UserGraphsCount(
      "Pie",
      sessionStorage.getItem('survey'),
      sessionStorage.getItem('company'),
      '' + users.userid
    );

    const Sector = await UserGraphsCount(
      "RadarAllSectors",
      sessionStorage.getItem('survey'),
      sessionStorage.getItem('company'),
      '' + users.userid
    );

    const Bar = await UserGraphsCount(
      "Bar",
      sessionStorage.getItem('survey'),
      sessionStorage.getItem('company'),
      '' + users.userid
    );

    const SectorRadar = await UserGraphsCount(
      "RadarBySector",
      sessionStorage.getItem('survey'),
      sessionStorage.getItem('company'),
      '' + users.userid
    );

    const SingleRadar = await UserGraphsCount(
      "Radar",
      sessionStorage.getItem('survey'),
      sessionStorage.getItem('company'),
      '' + users.userid
    );

    const st = {...this.state};

    if(Object.keys(Pie["data"]).length > 0){
      MySwal.close()
    }

    st.piedata = {...pie}
    st.piedata.labels = [...Object.keys(Pie["data"])]
    st.piedata.datasets[0].data = [...Object.values(Pie["data"])]

    st.radar = { ...radar }
    st.radar.labels = Sector.data.category
    st.radar.datasets[0].data = Sector.data.scores

    st.singleradar = { ...radarchek }
    // st.singleradar.labels = SingleRadar.data.category
    st.singleradar.datasets[0].data = SingleRadar.data.Physical
    st.singleradar.datasets[1].data = SingleRadar.data.Organizational
    st.singleradar.datasets[2].data = SingleRadar.data.Technical

    this.state.surveys.map( key1 => {
      const val = 'bar' + key1
      // const val1 = bar
      // val1.datasets[0].data = [...Bar.data[key1]]
      // val1.datasets[0].label = key1
      // st[val] = {...val1}
      // st[val] = {...bar}
      // console.log(val, "KKKK")
      // st[val] = {...radar}
      st[val].datasets[0].data = Bar.data[key1]
      st[val].datasets[0].label = key1
      console.log(val, st[val], key1,st[val].datasets[0].label)
      return null;
    })

    this.state.surveys.map( (key1, index) => {
      // const val = 'radar' + key1
      // const val1 = bar
      // val1.datasets[0].data = [...Bar.data[key1]]
      // val1.datasets[0].label = key1
      // st[val] = {...val1}
      // console.log(val, "KKKK")
      st['radar' + key1].datasets[0].data = SectorRadar.data[index].score
      st['radar' + key1].labels = SectorRadar.data[index].labels
      st['radar' + key1].datasets[0].label = key1
      return null;
      // console.log(val, st[val], key1,st[val].datasets[0].label)
    })
    // radar["labels"] = Sector.data.category
    // datasets[0]["data"] = Sector.data.scores
    this.setState({  
      piedata: st.piedata, 
      radar: st.radar, 
      barR1: st.barR1,  
      barR2: st.barR2,
      barR3: st.barR3,
      barR4: st.barR4,
      radarR1: st.radarR1,
      radarR2: st.radarR2,
      radarR3: st.radarR3,
      radarR4: st.radarR4,
      singleradar: st.singleradar})
  }

  setupCanvas = (canvas) => {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
  }

  printDocument = () => {

    const input = document.getElementById('new');
    const inputHeightMm = pxToMm(input.offsetHeight);
    // el.style.height = "200px";
    // el.style.width = "200px";
      const a4WidthMm = 210;
      const a4HeightMm = 297; 
      const a4HeightPx = mmToPx(a4HeightMm); 
      const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm/a4HeightMm) + 1;

      console.log({
        input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages), 
        comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
      });
 
    //   html2canvas(input, {
    //     windowWidth: input.offsetWidth + 100,
    //     windowHeight: input.offsetHeight + 400
    // })

    html2canvas(input)
      .then((canvas) => {
        console.log("CANVASSS", canvas)
        const img = canvas.toDataURL('image/png', 1.0);
        let pdf

        // let pdf = new jsPDF('p', 'mm', 'a4');
        // const pageWidth = pdf.internal.pageSize.getWidth();
        // const pageHeight = pdf.internal.pageSize.getHeight();
        // const pageRatio = pageWidth / pageHeight;


        // const imgWidth = canvas.width;
        //     const imgHeight = canvas.height;
        //     const imgRatio = imgWidth / imgHeight;
            // if (i > 0) { pdf.addPage(); }
            // pdf.setPage(i + 1);
            // if (imgRatio >= 1) {
                // const wc = imgWidth / pageWidth;
                // if (imgRatio >= pageRatio) {
                //   console.log("Check by 1")
                //     pdf.addImage(img, 'JPEG', 0, (pageHeight - imgHeight / wc) / 2, pageWidth, imgHeight / wc, null, 'NONE');
                // }
                // else {
                //   console.log("Check by 2")
                //     const pi = pageRatio / imgRatio;
                //     pdf.addImage(img, 'JPEG', (pageWidth - pageWidth / pi) / 2, 0, pageWidth / pi, (imgHeight / pi) / wc, null, 'NONE');
                // }
            // }
            // else {
            //     const wc = imgWidth / pageHeight;
            //     if (1 / imgRatio > pageRatio) {
            //         const ip = (1 / imgRatio) / pageRatio;
            //         const margin = (pageHeight - ((imgHeight / ip) / wc)) / 4;
            //         pdf.addImage(img, 'JPEG', (pageWidth - (imgHeight / ip) / wc) / 2, -(((imgHeight / ip) / wc) + margin), pageHeight / ip, (imgHeight / ip) / wc, null, 'NONE', -90);
            //     }
            //     else {

            //         pdf.addImage(img, 'JPEG', (pageWidth - imgHeight / wc) / 2, -(imgHeight / wc), pageHeight, imgHeight / wc, null, 'NONE', -90);
            //     }
            // }
                // pdf.save('Photo.pdf');


        // if (inputHeightMm > a4HeightMm) {
          // elongated a4 (system print dialog will handle page breaks)
          pdf = new jsPDF('p', 'mm', [789,1800]);
          // pdf = new jsPDF('l', 'pt', 'a4');
          // var width = pdf.internal.pageSize.getWidth();
          // var height = pdf.internal.pageSize.getHeight();
        // } else {
        //   // standard a4
          // pdf = new jsPDF();
        // }

        // const pdf = new jsPDF();
        // console.log("Checking by Data", window.innerWidth, window.innerHeight, window.pageXOffset, window.pageYOffset , input.offsetWidth, input.offsetHeight, input.scrollHeight, input.scrollWidth)
        pdf.addImage(img, 'PNG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("reports.pdf");
      })
    ;
  }
  

  render() {
    return (
      <div id="content" className="content">
        <div id="new">
        <Grid fluid>
          <Row>
            {this.state.surveys.map( survey => (
              <Col md={6}>
              <Card
                title={Rdata(survey)}
                content={
                        <Bar data={this.state['bar'+survey]} options={baroptions}/>
                }
              />
            </Col>
            ))}
            <Col md={6}>
              <Card
                title="Resilience Polar Chart"
                content={
                        <Pie data={this.state.piedata} options={options}/>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="Summary"
                content={
                        <Radar data={this.state.singleradar} options={singleradaroptions}/>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="Resilience Spider Chart"
                content={
                        <Radar data={this.state.radar} options={radaroptions}/>
                }
              />
            </Col>
            {this.state.surveys.map( survey => (
            <Col md={6}>
              <Card
                title={Rdata(survey)}
                content={
                        <Radar data={this.state['radar'+survey]} options={radaroptions}/>
                }
              />
            </Col>
            ))}
          </Row>
          <Button variant="raised" style={{float : "left"}} onClick={this.printDocument} className="Newbutton">Download Report</Button>
        </Grid>
        </div>
      </div>
    );
  }
}

export default GraphsDisplay;
