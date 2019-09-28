import React from "react";
import { Grid, Row, Col, Tab, Tabs } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import Card from "../../components/Card/Card.jsx";
import Cards from "../../components/Cards/Card.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';


import CardHeader from "../../components/Cards/CardHeader.jsx";
import CardContent from '@material-ui/core/CardContent';
import CardBody from "../../components/Cards/CardBody.jsx";
import Typography from '@material-ui/core/Typography';

import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


// import { Link } from "react-router-dom";
import "./user.css";
import update from "react-addons-update";
import Quiz from "../qutions/Quiz";
import Button from '@material-ui/core/Button';
// import Result from "../qutions/Result";
import axios from "axios";
import Stepper from "./stepper";
import Fab from '@material-ui/core/Fab';
// import SubCategory from "./subCategory";
import { Redirect } from "react-router-dom";
import './surveyList.css';

import withStyles from "@material-ui/core/styles/withStyles";

import DialogBox from "../../components/Dialog/Dialog.jsx"

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { companynames, surveyQuestions, userQuestionUpload, userTable, QuestionsCount, getSavedQuestions } from "../../services/userServices";

import { userlogin } from "../../services/login"

import Table from './TableDialog';
import ReviewSurvey from './ReviewSurvey';

const MySwal = withReactContent(Swal)


class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenDashBoard: false,
      TotalQuestion: 0,
      reviewOpen: false,
      OpenA:false,
      OpenB:false,
      OpenC:false,
      tabStateValue:0,
      value : ['N/A','Not at all','Rarely','Occasionally','Often','All the time'],
      sector : ['R1', 'R2', 'R3', 'R4'],
      sectorCompleted : [],
      R1Completed: false,
      R2Completed:false,
      R3Completed:false,
      R4Completed:false,
      confidentLabel : ['No','Slight', 'Somewhat', 'Fairly', 'Completely'],
      radioSelect : '',
      NoColor: 'default',
      SlightColor: 'default',
      SomewhatColor: 'default',
      FairlyColor: 'default',
      CompletelyColor : 'default',
      FinalJson: [] ,
      R1FinalJson: [],
      R2FinalJson: [],
      R3FinalJson: [],
      R4FinalJson: [],
      tabState:"Physical",
      activeStep: 0,
      PhysicalActiveStep: 0,
      OrganizationalActiveStep: 0,
      TechnicalActiveStep :0,
      PhysicalCompleted: {},
      OrganizationalCompleted: {},
      TechnicalCompleted: {},
      survey : "R1",
      OpenNav : false,
      cmpnames: [],
      Organizational: [],
      map: ["Physical","Organizational","Technical"],
      Physical:[],
      Technical: [],
      PhysicalQuizQuestions:[],
      OrganizationalQuizQuestions:[],
      TechnicalQuizQuestions:[],
      result: "",
      tdata: [],
      theader : []
    };
  }

  handleChange = event => {
    this.setState({
        radioSelect : event.target.value,
        SlightColor: 'default',
        SomewhatColor: 'default',
        FairlyColor: 'default',
        NoColor: 'default',
        CompletelyColor: 'default'
    });
}

reviewhandleChange = pointer => event => {

  let json = [ ...this.state[this.state.survey + "FinalJson"]]

  console.log(json)

  json[pointer]["qscore"] = event.target.value
  this.setState({ [this.state[this.state.survey + "FinalJson"]] : json})
  console.log(event.target.value, pointer, "SSSSSSS")
  // this.setState({
  //     radioSelect : event.target.value
  // });
}

  handleClick = (category, subsector,label,index) => (event) => {

      this.setUserAnswer(event.currentTarget.value, category, subsector);

    if (this.state[subsector + category + "QuestionId"] < this.state[subsector + category].length) {
      setTimeout(() => this.setNextQuestion(subsector, category), 500);
    } else {
      // setTimeout(() => this.setResults(this.getResults()), 300);
      // this.setState({ [category + "Completed"] : })
      setTimeout(() =>this.handleComplete(subsector), 500);
    }

    this.setState({
      [label + "Color"] : "secondary"
  })

  let m = this.state.TotalQuestion - ( this.state.FinalJson.length + this.state.R1FinalJson.length + this.state.R2FinalJson.length + this.state.R3FinalJson.length + this.state.R4FinalJson.length + 1 )

  if(m === 0){
    MySwal.fire({
      position: 'top-end',
      type : 'success',
      title: "Survey Completed",
      showConfirmButton: false,
      timer: 1500
    })
  }else{
    m = m + " Question Remaining"
    MySwal.fire({
      backdrop: false,
      position: 'top-end',
      title: m,
      showConfirmButton: false,
      timer: 1000
    })
  }
  }

  reviewhandleClick = (pointer, label, value) => () => {
    console.log(pointer,label,value, "New One")

    let json = [ ...this.state[this.state.survey + "FinalJson"]]
    json[pointer]["qconfidence"] = "" + value
    this.setState({ [this.state[this.state.survey + "FinalJson"]] : json})
  }

  isLastStep = (activeStep, subsector) => {
    return activeStep === this.totalSteps(subsector) - 1;
  }

totalSteps = (subsector) => {
  return this.state[subsector].length;
}

completedSteps = (completed) => {
  return Object.keys(this.state[completed]).length;
}

allStepsCompleted = (subsector) => {
  return this.completedSteps(subsector+"Completed") === this.totalSteps(subsector);
}

allSectorCompleted = () => {

for (let [index, value] of this.state.map.entries()) {
  // console.log(value, "AAAAAA");
  if(!this.allStepsCompleted(value)){
    this.setState({ tabState: value, tabStateValue: index, radioSelect: "" })
    return false
  }
}
// this.setState({radioSelect: "", OpenNav : true })
return true
}


  handleNext = (subsector) => {

    const key = subsector + "ActiveStep"
    let { [key] : activeStep } = this.state

    // console.log(this.isLastStep(activeStep, subsector), !this.allStepsCompleted(subsector))
    if (this.isLastStep(activeStep, subsector) && !this.allStepsCompleted(subsector)) {
      // console.log("Inside Inside")
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.state[subsector];
      activeStep = steps.findIndex((step, i) => !(i in this.state[subsector + "Completed"]));
      this.setState({
        [key] : activeStep,
        radioSelect: "",
      });
    } else if(!this.allStepsCompleted(subsector)){
      // console.log("Outside")
      activeStep = activeStep + 1;
      this.setState({
        [key] : activeStep,
        radioSelect: ""
      });
    } else{
      if(this.allSectorCompleted()){
        this.setState({radioSelect: "", OpenNav : true })
      }
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleChangeTab = (subsector) => {
    this.setState({ tabState : subsector })
  }

  handleStep = (sub, step, check) => () => {
        this.setState({[sub + "ActiveStep"]: step});
    };

  handleComplete = (subsector) => {

    let key = subsector + "Completed"
    const { [key] : completed } = this.state;
    
    completed[this.state[subsector + "ActiveStep"]] = true;

    this.setState({
      completed,
    });

    this.handleNext(subsector)
    
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  componentWillMount() {
    
  }
  async getcompanyname() {
    const { cmpnames } = await companynames();
    this.setState({ cmpnames });
  }
   async componentDidMount() {
    let sector = this.props.location.search.replace('?', '')
    const company = sessionStorage.getItem("company")
    const users = JSON.parse(sessionStorage.getItem("userDetails"))
    let sectors = []
    let FinalJson = []
    
    const Count = await QuestionsCount(
      sessionStorage.getItem("survey"),
      company
    );

    const oldData = await getSavedQuestions(
      sessionStorage.getItem("survey"), 
      company,
      users.email
    );

    if(oldData.data.length !== 0){
      FinalJson = oldData.data[0].rows
      sectors = oldData.data[0].sector
      sectors.map( sec => 
        this.setState({ [sec+"Completed"] : true })
      )
    }

    if(sectors.length !== 0 && sectors.includes(sector)){
      for( let sect of this.state.sector){
        if(!sectors.includes(sect)){
          if(sectors.includes(sector)){
            await MySwal.fire({
              customClass: {
              popup: 'image-class',
            },
            type: 'info',
            allowOutsideClick: true,
            title: `Already ${sector} Survey Completed`,
            text : `Moving to ${sect}`,
            timer: 3000,
            })
          }
          sector = sect
          break;
        }else if(!sectors.includes(sect) && sector === sect){
          sector = sect
          break;
        }
      }
    }

    console.log(sectors, FinalJson, sector)
    
    this.setState({ TotalQuestion : Count.data, survey : sector, FinalJson, sectorCompleted : sectors})
    this.surveyQuestionCall(sector)
   }
  handleAnswerSelected = (category,subsector, event) => {

    this.setUserAnswer(event.currentTarget.value, category, subsector);


    if (this.state[subsector + category + "QuestionId"] < this.state[subsector + category].length) {
      setTimeout(() => this.setNextQuestion(subsector, category), 50);
    } else {
      // setTimeout(() => this.setResults(this.getResults()), 300);
      // this.setState({ [category + "Completed"] : })
      setTimeout(() =>this.handleComplete(subsector), 50);
    }

    
  }
  
  setNextQuestion(subsector, category){
    const counter = this.state[subsector + category+"Counter"] + 1;
    const questionId = this.state[subsector + category+"QuestionId"] + 1;
    

    this.setState({
      [subsector + category+"Counter"]: counter,
      [subsector + category+"QuestionId"]: questionId,
      [subsector + category+"Question"]: this.state[subsector + category][counter].question,
      [subsector + category+"nist"]: this.state[subsector + category][counter].nist,
      [subsector + category+"ref"]: this.state[subsector + category][counter].cat_reference,
      [subsector + category+"ref_desc"]: this.state[subsector + category][counter].cat_explanation,
      radioSelect: ""
    });
  }

  setUserAnswer(answer, category, subsector) {
    // const updatedAnswersCount = update(this.state.answersCount, {
    //   [answer]: { $apply: currentValue => currentValue + 1 }
    // });

    const counter = this.state[subsector + category+"Counter"]
    // console.log(this.state[subsector + category][counter], "Counter check")
    const obj = [{
      "cname" : this.state[subsector + category][counter].cname,
      "cid" : this.state[subsector + category][counter].cid,
      "qid" : this.state[subsector + category][counter].qid,
      "qscore" : this.state.radioSelect,
      "qconfidence" : answer,
      "sector" : this.state.survey,
      "subsector": subsector,
      "question" : this.state[subsector + category][counter].question
    }]
     
    let singleJson = this.state[this.state.survey + "FinalJson"].concat(obj);

    // FinalJson = FinalJson.concat(localStorage.getItem("FinalJson"))
    this.setState({
      // answersCount: updatedAnswersCount,
      answer: answer,
      [this.state.survey + "FinalJson"] : singleJson
    });

  }

  renderQuiz = (answer, answerOptions, questionID, question, category, subsector) => {

    if ( this.state[subsector + category] !== undefined ){
    return (
      <Quiz
        questionId={questionID}
        question={question}
        questionTotal={this.state[subsector + category].length}
        handleClick={this.handleClick.bind(this, category, subsector)}
        handleChange={this.handleChange}
        radioSelect={this.state.radioSelect}
        value={this.state.value}
        confidentLabel={this.state.confidentLabel}
        NoColor={this.state.NoColor}
        SlightColor={this.state.SlightColor}
        SomewhatColor={this.state.SomewhatColor}
        FairlyColor={this.state.FairlyColor}
        CompletelyColor={this.state.CompletelyColor}
      />
    );
  }

  }

  allMainSectorCompleted = (prevSurvey) => {

    for (var sector of this.state.sector){
      console.log( this.state[sector+"Completed"] , "PREV")
      if(!this.state[sector+"Completed"]  && prevSurvey !== sector){
        return sector
      }
    }
    return null
  }

  surveyQuestionCall = async (survey) => {
    MySwal.fire({
      customClass: {
      popup: 'image-class',
      },
      title: 'Please Wait',
      allowOutsideClick: false,
      onBeforeOpen: () => {
          MySwal.showLoading()
          this.getPhysicalName(survey).then((check) => {
            this.getOrganizationalName(survey).then((check1) => {
              this.getTechnicalName(survey).then(( check2 ) => {
                console.log(check2, this.state.PhysicalQuizQuestions)
                if(this.state.PhysicalQuizQuestions[0] === "done"){
                    MySwal.fire({
                        customClass: {
                        popup: 'image-class',
                    },
                    type: 'warning',
                    allowOutsideClick: false,
                    title: 'Already Survey Completed',
                    confirmButtonText: 'Please Click Me to See Reports'
                    }).then((check) => {
                      if(check.value === true){
                        this.setState({ OpenC : true})
                      }
                    })
                    }else{
                      MySwal.close()
                    }
              })
            });
          })
  }
})
  }

  handleSurvey = (survey, prevSurvey) => {
    let sectors = this.state.sectorCompleted.concat(prevSurvey)
    if(survey){
      this.setState({ sectorCompleted : sectors, OpenNav: false, tabState: "Physical", tabStateValue: 0, survey : survey, [prevSurvey+"Completed"] : true, PhysicalCompleted: {}, OrganizationalCompleted: {}, TechnicalCompleted: {}, PhysicalActiveStep: 0, OrganizationalActiveStep: 0, TechnicalActiveStep :0,})
      this.surveyQuestionCall(survey)
    }
  }

  reviewSurvey = () => {
    this.setState({ reviewOpen : true})
  }

  handleClose = async() => {
    if(this.state.OpenA){
      this.setState({ OpenB : false, OpenA : false, OpenC : true })
    }else{
      this.setState({ OpenB : false, OpenA : false })
    }
  }

  reviewhandleClose = async() => {
    
      this.setState({ reviewOpen : false })
  }

  handleSave = async (prevSurvey) => {
    const users = JSON.parse(sessionStorage.getItem("userDetails"))
    let FinalJson = [ ...this.state.FinalJson]

    console.log(FinalJson, "Final Check")

    FinalJson = FinalJson.concat(this.state.R1FinalJson, this.state.R2FinalJson, this.state.R3FinalJson, this.state.R4FinalJson);
    
    console.log(FinalJson)
    let Json = {
      survey: sessionStorage.getItem("survey"),
      company: sessionStorage.getItem("company"),
      userid: '' + users.userid,
      username: sessionStorage.getItem("userName"),
      emailid:users.email,
      department: users.department,
      role: users.role,
      sector: this.state.sectorCompleted.concat(prevSurvey),
      rows: FinalJson,
    }

    MySwal.fire({
      customClass: {
      popup: 'image-class',
      },
      title: 'Please Wait',
      text: 'Saving the Survey',
      onBeforeOpen: () => {
          MySwal.showLoading()
          userQuestionUpload(Json).then( (result) => {
            if(result.status === 200){
               MySwal.fire({
                  customClass: {
                  popup: 'image-class',
              },
              type: 'success',
              title: 'Survey Saved Successfully',
              text: 'Thanks for your patience',
              confirmButtonText: 'Close'
              }).then( () => 
              this.setState( { OpenDashBoard : true })
              )
            }
          })
        }
      })
  }

  handleSubmit = async () => {
    const users = JSON.parse(sessionStorage.getItem("userDetails"))
    let FinalJson = [ ...this.state.FinalJson]
    FinalJson = FinalJson.concat(this.state.R1FinalJson, this.state.R2FinalJson, this.state.R3FinalJson, this.state.R4FinalJson);
    
    let Json = {
      survey: sessionStorage.getItem("survey"),
      company: sessionStorage.getItem("company"),
      userid: '' + users.userid,
      username: sessionStorage.getItem("userName"),
      emailid:users.email,
      department: users.department,
      role: users.role,
      sector: this.state.sectorCompleted.concat(this.state.survey),
      rows: FinalJson,
    }

    console.log(Json, "SSSSSSS")
    // const data = await userQuestionUpload(Json);

    // if(data.status === 200){

    //   // this.setState({ OpenA : true ,})
    // }else{
    //   // this.setState({ OpenB : true ,})
    // }

    MySwal.fire({
      customClass: {
      popup: 'image-class',
      },
      title: 'Please Wait',
      text: 'Reports are Generating',
      onBeforeOpen: () => {
          MySwal.showLoading()
          userQuestionUpload(Json).then( (result) => {
            if(result.status === 200){
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
                    userTable(sessionStorage.getItem("survey"), sessionStorage.getItem("company"), users.userid).then( (result) => {
                        if(result.status === 200){
                          setTimeout(()=>{
                            this.setState({theader : result.data[0], tdata : result.data, OpenA : true})
                            console.log(result.data, 'CCCCC')
                          },200)
                        }else{
                          MySwal.fire({
                            customClass: {
                            popup: 'image-class',
                        },
                        type: 'error',
                        title: 'Oops...',
                        text: 'Report Generation Failed',
                        confirmButtonText: 'Please Click Me To See Detailed Report'
                        })
                        }
                    })
                  }
                    // this.setState({ OpenC : true })
              })
            }else{
              MySwal.fire({
                customClass: {
                popup: 'image-class',
            },
            type: 'error',
            title: 'Oops...',
            text: 'Upload Failed',
            confirmButtonText: 'Please Try Again'
            })
            }
      })
  }
})
    console.log(Json)
    
  };

  renderResult() {
    // const prevSurvey = this.state.FinalJson.slice(-1)[0].sector
    let prevSurvey = this.state.sectorCompleted[-1]
    if(!this.state.sectorCompleted[-1]){
      prevSurvey = this.state.survey
    }
   
    console.log(prevSurvey, "New Check")
    const survey = this.allMainSectorCompleted(prevSurvey)
    console.log(prevSurvey, survey, "SSSSS")
    if(survey){
    return (
      <div>
      <Button color="primary" variant="outlined" aria-label="Add" onClick={this.reviewSurvey.bind(this)}>
        <span style={{fontSize:"15px"}}>Review {prevSurvey}</span>
      </Button>
      <Button color="primary" variant="outlined" style={{marginLeft : "1%"}} aria-label="Add" onClick={this.handleSave.bind(this, prevSurvey)}>
        <span style={{fontSize:"15px"}}>Save Survey to continue later</span>
      </Button>
      <Button color="secondary" variant="outlined" aria-label="Add" style={{float : "right"}} onClick={this.handleSurvey.bind(this,survey, prevSurvey)}>
        <span style={{fontSize:"15px"}}>Go To {survey}</span>
      </Button>
      </div>
      )
    }else{
      return(
      <div>
      <Button color="primary" variant="outlined" aria-label="Add" onClick={this.reviewSurvey.bind(this)}>
        <span style={{fontSize:"15px"}}>Review {prevSurvey}</span>
      </Button>
      <Button variant="outlined" color="secondary" style={{float : "right"}} onClick={this.handleSubmit}>
        <span style={{fontSize:"15px"}}>Submit</span>
      </Button>
      </div>
      )
    }
}
  
  // handleClick = index => this.setState({ activeIndex: index });
  onChange = event => {
    this.setState({ resiliencequality: event });
  };
  handleQutionsClick = index => this.setState({ activeIndexQutions: index });
  handleQutionsClick2 = index => this.setState({ activeIndexQutions2: index });
  async getPhysicalName(survey) {
    const  Physical = await companynames(
      sessionStorage.getItem("survey"),
      sessionStorage.getItem("company"),
      survey,
      "Physical"
    );
      this.setState({ Physical: Physical.data});
      const data = Physical.data
      data.map((cat,index) => 
      this.getQuestions(sessionStorage.getItem("survey"), sessionStorage.getItem("company"), survey, "Physical", cat, index)
    );
  }
  async getOrganizationalName(survey) {
    const  Organizational  = await companynames(
      sessionStorage.getItem("survey"),
      sessionStorage.getItem("company"),
      survey,
      "Organizational"
    );
    this.setState({ Organizational:Organizational.data });

    const data = Organizational.data
    

    data.map((cat,index) => 
      this.getQuestions(sessionStorage.getItem("survey"), sessionStorage.getItem("company"), survey, "Organizational", cat, index)
    );

  }
  async getTechnicalName(survey) {
    const  Technical  = await companynames(
      sessionStorage.getItem("survey"),
      sessionStorage.getItem("company"),
      survey,
      "Technical"
    );
    this.setState({ Technical:Technical.data });

    const data = Technical.data

    data.map((cat,index) => 
    this.getQuestions(sessionStorage.getItem("survey"), sessionStorage.getItem("company"), survey, "Technical", cat, index)
  );
  
  }

  async getQuestions(main, company, survey, sector, category, index) {
    const users = JSON.parse(sessionStorage.getItem("userDetails"))

    const  questions = await surveyQuestions(
      main,
      company,
      survey,
      sector,
      category,
      users.email,
    );

    // if(questions.data === "done"){
    //   MySwal.fire({
    //       customClass: {
    //       popup: 'image-class',
    //   },
    //   type: 'warning',
    //   allowOutsideClick: false,
    //   title: 'Already Survey Completed',
    //   confirmButtonText: 'Please Click Me to See Reports'
    //   }).then((check) => {
    //     if(check.value === true){
    //       this.setState({ OpenC : true})
    //     }
    //   })
    //   }
      let arr = []
        arr = this.state[sector + "QuizQuestions"]
        arr = arr.concat(questions.data)
        this.setState({ [sector + "QuizQuestions"] : arr, [sector + category] : questions.data, [sector + category + "Question"] : questions.data[0].question, [sector + category + "QuestionId"] : 1, [sector + category + "Counter"] : 0, [sector + category + "nist"] : questions.data[0].nist, [sector + category + "ref"] : questions.data[0].cat_reference, [sector + category + "ref_desc"] : questions.data[0].cat_explanation })
  }

  tabChange = (event, value) => {
    // console.log(event.target.value,event.currentTarget.value,"Hey this is new", value)
    this.state.map.map((prop, key) => {
      if(key === value){
        this.setState({ tabState:prop, tabStateValue: value })
      }
      return null
    })
  }
  

  render() {

    let loading = null

    if(true){
      loading = <CircularProgress/>
    }

    const { classes } = this.props;
    
    return (
      <div className="content">
        <Grid fluid>
          <Row md={12}>
            <Col md={12}>
              <CustomTabs
              value={this.state.tabStateValue}
              tabValue={this.state.tabState}
              headerColor="rose"
              handleChange={this.tabChange}
              tabs={ this.state.map.map( subsector =>{
                if(this.state.PhysicalCompleted === this.state.Physical.length){
                  console.log("Checking by new Concept")
                }
                return{
                  tabName: subsector,
                  tabIcon: null,
                  tabContent: (
                    <Stepper steps={this.state[subsector]} completed={this.state[subsector+ "Completed"]} handleStep={this.handleStep.bind(this, subsector)} activeStep={this.state[subsector+ "ActiveStep"]}/>
                  )
                }})
              }
              />
            </Col>
          </Row>
          <Row md={12}>
            <Col md={12}>
              <Cards>
              <CardHeader color="rose">
                <Toolbar className={classes.tool}>
                  <Typography variant="h4" color="inherit" align="left" className={classes.lgrow}>
                  <Typography variant="h5" color="inherit" align="left" className={classes.grow}>
                    REFERENCE
                  </Typography>
                  <br/>
                  </Typography>
                  <Typography variant="h4" color="inherit" align="center" className={classes.cgrow}>
                  <Typography variant="h5" color="inherit" align="center" className={classes.grow}>
                    METRIC EXPLANATION
                  </Typography>
                  <br/>
                  </Typography>
                  <Typography variant="h4" color="inherit" align="right" className={classes.rgrow}>
                  <Typography variant="h5" color="inherit" align="right" className={classes.grow} >
                    NIST FUNCTION
                  </Typography> 
                  <br/>
                  </Typography> 
                </Toolbar>
              </CardHeader>
              <CardHeader color="info">
                {this.state.map.map( sector => ( ( this.state[sector].length !== 0 && this.state.tabState === sector) ?  
                
                <Toolbar className={classes.tool}>
                  <Typography variant="h4" color="inherit" align="left" className={classes.lgrow}>
                  <Typography variant="h5" color="inherit" align="left" className={classes.grow}>
                  {this.state[sector + this.state[sector][this.state[sector + "ActiveStep"]] + "ref"]}
                  </Typography>
                  </Typography>
                  <Typography variant="h4" color="inherit" align="center" className={classes.cgrow}>
                  <Typography variant="h5" color="inherit" align="center" className={classes.grow}>
                  {this.state[sector + this.state[sector][this.state[sector + "ActiveStep"]] + "ref_desc"]}
                  </Typography>
                  </Typography>
                  <Typography variant="h4" color="inherit" align="right" className={classes.rgrow}>
                  <Typography variant="h5" color="inherit" align="right" className={classes.igrow} >
                  {this.state[sector + this.state[sector][this.state[sector + "ActiveStep"]] + "nist"]}
                  </Typography>
                  </Typography> 
        </Toolbar> : null))}
              </CardHeader>
              <CardBody>
        { !this.state.OpenNav ? (
                    <div>
                      {this.state.map.map( (sector, index) => ( (this.state[sector+"Completed"][this.state[sector+"ActiveStep"]] === undefined && this.state[sector].length !== 0 && this.state.tabState === sector) ? this.renderQuiz(this.state.answer, this.state.answerOptions, this.state[sector + this.state[sector][this.state[sector + "ActiveStep"]] + "QuestionId"], this.state[sector + this.state[sector][this.state[sector + "ActiveStep"]] + "Question"] , this.state[sector][this.state[sector+"ActiveStep"]], sector) : null))}
                    </div>
                  ) : this.renderResult()} 
        </CardBody>
      </Cards>
            </Col>
          </Row>
        </Grid>
        <Table open={this.state.OpenA} handleClose={this.handleClose} tdata={this.state.tdata}/>
        { this.state.OpenC ? <Redirect to='/users/graphsdisplay' /> : null}
        { this.state.OpenDashBoard ? <Redirect to='/users/dashboard' /> : null}
        {this.state.reviewOpen ? <ReviewSurvey classes={classes} open={this.state.reviewOpen} handleChange={this.reviewhandleChange.bind(this)} handleClose={this.reviewhandleClose} handleClick={this.reviewhandleClick.bind(this)} state={this.state} FinalJson={this.state[this.state.survey + "FinalJson"]}/> : null }
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(SurveyList);
