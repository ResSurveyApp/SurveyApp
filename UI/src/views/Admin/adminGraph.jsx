import React, { Component } from "react";

import Dialog from './Dialog';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from './UI';
import Auxillary from '../../hoc/Auxillary';
import './RequestPage.css';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';


import admin_graph from '../../assets/img/admin_graph.jpg';
import radarchek from './check';
import { AdminGraphsCount, ChartsAll, DeptAllCharts } from "../../services/graphService";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {
    companynamesFromUser,
    companySurveyNamesFromUser,
    departmentnamesFromUser,
    GetAllUsers,
  } from "../../services/adminService";

  const MySwal = withReactContent(Swal)

function selectHelper(label,menu,style){
    return{
      elementType:'select',
      label:label,
      menu:menu,
      value:'',
      style:style,
      disabled:false,
      allValues:[],
      error:false
    }
}

const bar1 = ['rgba(255,99,132,0.2)', 'rgba(28,21,231,0.2)', 'rgba(227,229,7,0.2)']
const bgbar1 = ['rgba(255,99,132,1)', 'rgba(28,21,231,1)', 'rgba(227,229,7,1)']
const borderbar1 = ['rgba(255,99,132,0.4)', 'rgba(28,21,231,0.4)', 'rgba(227,229,7,0.4)']

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

  function getRandomColor(max, min) {
    let color = Math.floor(Math.random() * (max - min + 1)) + min
    return color;
}


let Redbar1 = getRandomColor(250, 150)
let Greenbar1 = getRandomColor(100, 200)
let Bluebar1 = getRandomColor(150, 50)

let Redbar2 = getRandomColor(150, 50)
let Greenbar2 = getRandomColor(250, 150)
let Bluebar2 = getRandomColor(100, 200)

let Redbar3 = getRandomColor(100, 200)
let Greenbar3 = getRandomColor(150, 50)
let Bluebar3 = getRandomColor(250, 150)

let Redbar4 = getRandomColor(250, 200)
let Greenbar4 = getRandomColor(170, 130)
let Bluebar4 = getRandomColor(40, 180)
class AdminGraph extends Component {


     state = {
        dataframe : '',
        oldGraph : false,
        surveys : ['R1','R2','R3', 'R4'],
        open: false,
        piedata :{ },
        radar:{ },
        singleradar:{ },
        RequestForm:{
            company:selectHelper('Company',[],{"font-size":"14px", "text-align":"left","min-width":"170px"}),
            survey:selectHelper('Survey',[],{"font-size":"14px","text-align":"left","min-width":"170px"}),
            department:selectHelper('Dept',[],{"font-size":"14px","text-align":"left", "min-width":"170px"}),
            user:selectHelper('Select Users',[],{"font-size":"14px","text-align":"left", "min-width":"170px"}),
        },
        data: {
            companyName: "",
            surveyName: "",
            departmentName: ""
          },
          cmpnames: [],
          departementname: [],
          surveyname: [],
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
            };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    callAPI = async () => {

      const rqForm={
        ...this.state.RequestForm
      }

      let dataFrame = ''
      if( rqForm.department.value !== 'All'){
        const data = await DeptAllCharts(
            rqForm.survey.value,
            rqForm.company.value,
            rqForm.department.value
          );
          dataFrame = data.data
        }else{
            const data = await ChartsAll(
                rqForm.survey.value,
                rqForm.company.value
              );
          dataFrame = data.data
        }

        this.setState({ dataFrame })
        const Pie = await AdminGraphsCount(
            "Pie",
            dataFrame
          );
      
          const Sector = await AdminGraphsCount(
            "RadarAllSectors",
            dataFrame
          );
      
          const Bar = await AdminGraphsCount(
            "Bar",
            dataFrame
          );
      
          const SectorRadar = await AdminGraphsCount(
            "RadarBySector",
            dataFrame
          );
      
          const SingleRadar = await AdminGraphsCount(
            "Radar",
            dataFrame
          );

          const st = {...this.state};

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

    console.log(st.barR1, st.barR2)
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

          return "HHH"
    }

    clear = () => {
      let RequestForm = { ...this.state.RequestForm}
      RequestForm.company.value = ""
      RequestForm.survey.value = ""
      RequestForm.department.value = ""
      RequestForm.user.value = ""
      RequestForm.survey.menu = []
      RequestForm.department.menu = []
      RequestForm.user.menu = []
      this.setState({ RequestForm, oldGraph :  false })
    }

    check = () => {
        console.log("Submit")

        MySwal.fire({
            customClass: {
            popup: 'image-class',
            },
            title: 'Please Wait',
            text: 'Reports are Generating',
            onBeforeOpen: () => {
                MySwal.showLoading()
                this.callAPI().then( (check) => {
                MySwal.fire({
                    customClass: {
                    popup: 'image-class',
                },
                type: 'success',
                title: 'Reports Generated',
                text: 'Thanks for your patience',
                confirmButtonText: 'Please Click Me to See Reports'
                }).then( (check)=>{
                    if(check.value){
                    setTimeout(()=>{
                        this.setState({ open : true, oldGraph : true })
                    },200);
                    }
                })
            })
        }
    })
    }

    handleChange = async (event,InputIdentifier) => {
        const rqForm={
            ...this.state.RequestForm
        }

        rqForm[InputIdentifier]['value']=event.target.value
        this.setState({RequestForm:rqForm})
        if(InputIdentifier === 'company'){
            await this.getcompanySurveyNames(event.target.value);
        }
        if(InputIdentifier === 'survey'){
            await this.getdepartmentNames(rqForm.company.value, event.target.value);
        }
        if(InputIdentifier === 'department'){
            await this.getusersNames(rqForm.company.value,rqForm.survey.value);
        }
        // if(InputIdentifier === 'user'){
        //     await this.getusersNames(rqForm.company.value,rqForm.survey.value, event.target.value);
        // }
    }

    async componentDidMount() {
        await this.getcompanyname();
      }

    async getcompanyname() {
        let rf={...this.state.RequestForm}
        const  cmpnames = await companynamesFromUser();
        rf.company.menu = cmpnames.data
        this.setState({ RequestForm:rf });
      }
      async getcompanySurveyNames(companyName) {
        let rf={...this.state.RequestForm}
        const  surveyname = await companySurveyNamesFromUser(companyName);
        rf.survey.menu = surveyname.data
        this.setState({ RequestForm:rf });
      }
      async getdepartmentNames(companyName, surveyName) {
        let rf={...this.state.RequestForm}
        const  departementname  = await departmentnamesFromUser(surveyName, companyName);
        rf.department.menu = departementname.data
        rf.department.menu.push('All')
        this.setState({ RequestForm:rf });
      }
      async getusersNames(companyName, surveyName, deptName) {
        let rf={...this.state.RequestForm}
        const  getAllUsers  = await GetAllUsers(surveyName, companyName, deptName);
        rf.user.menu = getAllUsers.data
        rf.user.menu.push('All')
        this.setState({ RequestForm:rf });
      }

    render() {
        const rf={...this.state.RequestForm}
        let requestArray=[];
        for(let key in rf){         
            requestArray.push({
            id:key,
            config: rf[key]
            })
        }
        const details = requestArray.map((n,index)=>{
                            if(index === 2){
                               return  <Auxillary><br/><Input
                               key={n.id}
                               id={n.id}
                               elementType={n.config.elementType}
                               config={n.config}
                               handleChange={this.handleChange.bind(this)}
                           /></Auxillary>
                            }else{
                                return  <Input
                                key={n.id}
                                id={n.id}
                                elementType={n.config.elementType}
                                config={n.config}
                                handleChange={this.handleChange.bind(this)}
                            />
                            }
                    }
                )
        return(
            <div>
            <Card style={{textAlign:"center" ,height:"550px",borderTop:"8px solid #217ba7",borderBottom:"8px solid #217ba7", backgroundImage:`url(${admin_graph})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundClip:" content-box"}}> 
            <div className="Newcard">
                <Card>
                        <CardContent>
                            <div>{details}</div>
                            <br/>
                              <div>
                                  <Button variant="raised" onClick={this.check} className="Newbutton">Submit</Button>
                                  <Button variant="raised" onClick={this.clear} style={{backgroundColor:"red",color:"white",fontSize:"14px","margin-right":"20px"}}>Clear</Button>
                                  {this.state.oldGraph ? <Button variant="raised" onClick={()=> this.setState({ open: true}) } style={{backgroundColor:"#cccccc",color:"black","margin-right":"20px",fontSize:"12px"}}>Reports</Button> : null }
                                  {/* <NavLink activeClassName="navlink" to={{pathname: "/"}} style={{textDecoration:"none"}}><Button variant="raised" style={{backgroundColor:"#cccccc",color:"black","margin-right":"20px",fontSize:"12px"}}>Cancel</Button></NavLink> */}
                                  </div>
                              
                              <Dialog state={this.state} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} open={this.state.open}/>
                        </CardContent>
                </Card>
                </div>
                </Card>
                {/* {this.state.open ? <Dialog handleClickOpen={this.handleClickOpen} handleClose={this.handleClose} open={this.state.open}/> : null } */}
            </div>
        );
    }
}


export default AdminGraph;