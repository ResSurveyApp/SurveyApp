import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import Card from "../../components/Card/Card.jsx";
// import { Link } from "react-router-dom";
import "./user.css";
import update from "react-addons-update";
import Quiz from "../qutions/Quiz";
import Result from "../qutions/Result";
import Stepper from "./stepper";
// import SubCategory from "./subCategory";

import { companynames, surveyQuestions } from "../services/userServices";
class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FinalJson: JSON.parse(localStorage.getItem('FinalJson')) || [] ,
      tabState:"Physical",
      activeStep: 0,
      PhysicalActiveStep: 0,
      OrganisationalActiveStep: 0,
      TechnicalActiveStep :0,
      PhysicalCompleted: {},
      OrganisationalCompleted: {},
      TechnicalCompleted: {},
      survey : "",
      activeIndex: null,
      activeIndexQutions: null,
      activeIndexQutions2: null,
      resiliencequality: "",
      PhysicalCounter: 0,
      cmpnames: [],
      Organisational: [],
      map: ["Physical","Organisational","Technical"],
      Physical:[],
      Technical: [],
      PhysicalQuestionId: 1,
      PhysicalQuestion: "",
      answerOptions: [ {
        type: 1,
        content: 1
    },
    {
        type: 2,
        content: 2
    },
    {
        type: 3,
        content: 3
    },{
      type: 4,
      content: 4
  },{
    type: 5,
    content: 5
}],
answerOptionstrial: [ {
        type: "Low",
        content: "Ok"
    },
    {
        type: "Middle",
        content: "Confident"
    },
    {
        type: "High",
        content: "Sure"
    }],
answersCount: {
  Low: 0,
  Middle: 0,
  High: 0,
  Confident: 0,
  Excellent:0
},
      PhysicalQuizQuestions:[],
      OrganisationalQuizQuestions:[],
      TechnicalQuizQuestions:[],
      result: ""
    };
  }

  isLastStep = (activeStep, subsector) => {
    console.log(activeStep, "  FInal Step,", this.totalSteps(subsector) - 1)
    return activeStep === this.totalSteps(subsector) - 1;
  }

totalSteps = (subsector) => {
  console.log(this.state[subsector].length)
  return (this.state[subsector].length);
}

completedSteps = (completed) => {
  return Object.keys(completed).length;
}

allStepsCompleted = () => {
  return this.completedSteps() === this.totalSteps();
}


  handleNext = (subsector, category) => {
    const key = subsector + "ActiveStep"
    let { [key] : activeStep } = this.state

    console.log(this.isLastStep(activeStep, subsector), "Lats Step", activeStep)
    if (this.isLastStep(activeStep, subsector)) {
      console.log("Inside Inside")
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.state[subsector];
      activeStep = steps.findIndex((step, i) => !(i in this.state[subsector + "Completed"]));
    } else {
      console.log("Outside")
      activeStep = activeStep + 1;
    }

    console.log(this.state[subsector + "Completed"], "This is Subsector+comepleted", subsector)
    console.log(this.state[subsector])
    console.log("ACRTIVE STEP ", activeStep)
    
    this.setState({
      [key] : activeStep,
      answer: ""
    });

    console.log(activeStep, this.state[key])
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleChangeTab = (subsector) => {
    console.log("EVENT EVENT", subsector)
    this.setState({ tabState : subsector })
  }

  handleStep = (sub, step, check) => () => {

    console.log(step, sub, check, this.state.PhysicalActiveStep, this.state.TechnicalActiveStep, this.state.OrganisationalActiveStep)
    switch (sub) {
      case "Physical":
        console.log("Inside Physical")
        this.setState({PhysicalActiveStep: step});
        break;
      case "Organisational":
        this.setState({OrganisationalActiveStep: step});
        break;
      case "Technical":
        this.setState({TechnicalActiveStep: step});
        break;
      default:
        this.setState({activeStep: step});
        break;
    }
    // this.renderQuiz(this.state.answer, this.state.answerOptions, this.state.PhysicalQuestionId, this.state[check].PhysicalQuestion, this.state[check].length, "category")
    // this.getQuestions("MySurvey", "CGI", survey, sub, cat, index)

  };

  handleComplete = (category, subsector) => {

    let key = subsector + "Completed"
    const { [key] : completed } = this.state;
    
    completed[this.state[subsector + "ActiveStep"]] = true;

    this.setState({
      completed,
    });

    this.handleNext(subsector, category)
    
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
    const survey = this.props.location.search.replace('?', '')
    this.setState({ survey : survey})
     await this.getPhysicalName(survey);
    await this.getOrganisationalName(survey);
    await this.getTechnicalName(survey);
   }
  // shuffleArray(array) {
  //   var currentIndex = array.length,
  //     temporaryValue,
  //     randomIndex;

  //   // While there remain elements to shuffle...
  //   while (0 !== currentIndex) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }

  //   return array;
  // }
  handleAnswerSelected = (category,subsector, event) => {

    this.setUserAnswer(event.currentTarget.value, category, subsector);

    if (this.state[category + "QuestionId"] < this.state[category].length) {
      setTimeout(() => this.setNextQuestion(category), 300);
    } else {
      // setTimeout(() => this.setResults(this.getResults()), 300);
      // this.setState({ [category + "Completed"] : })
      setTimeout(() =>this.handleComplete(category, subsector), 300);
    }
  }
  setNextQuestion(category){
    const counter = this.state[category+"Counter"] + 1;
    const questionId = this.state[category+"QuestionId"] + 1;
    

    this.setState({
      [category+"Counter"]: counter,
      [category+"QuestionId"]: questionId,
      [category+"Question"]: this.state[category][counter].question,
      answer: ""
    });
  }

  // getResults() {
  //   const answersCount = this.state.answersCount;
  //   const answersCountKeys = Object.keys(answersCount);
  //   const answersCountValues = answersCountKeys.map(key => answersCount[key]);
  //   const maxAnswerCount = Math.max.apply(null, answersCountValues);

  //   return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  // }

  // setResults(result) {
  //   if (result.length === 1) {
  //     this.setState({ result: result[0] });
  //   } else {
  //     this.setState({ result: "Undetermined" });
  //   }
  // }

  renderQuiz = (answer, answerOptions, questionID, question, category, subsector) => {

    if ( this.state[category] !== undefined ){
    return (
      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        questionId={questionID}
        question={question}
        questionTotal={this.state[category].length}
        onAnswerSelected={this.handleAnswerSelected.bind(this, category, subsector)}
      />
    );
  }
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  setUserAnswer(answer, category, subsector) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: { $apply: currentValue => currentValue + 1 }
    });

    const counter = this.state[category+"Counter"]
    const obj = [{
      "cid" : this.state[category][counter].cid,
      "qid" : this.state[category][counter].qid,
      "qscore" : answer,
      "qconfidence" : 3,
      "sector" : this.state.survey,
      "subsector": subsector
    }]

    let FinalJson = this.state.FinalJson.concat(obj);
    
    // FinalJson = FinalJson.concat(localStorage.getItem("FinalJson"))
    console.log("final adssssssssssssDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD JSON and is values", FinalJson)

    console.log("This is Answer", updatedAnswersCount)
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer,
      FinalJson: FinalJson
    });

    localStorage.setItem("FinalJson", JSON.stringify(FinalJson));

    // if (localStorage.hasOwnProperty("FinalJson")) {
    //   // get the key's value from localStorage
    //   let value = localStorage.getItem("FinalJson");

    //   console.log("HEY DUD THISSSSSSSSSSSSSSSS , ", value)
    // }
  }
  
  onSelectCategory = () => {
    // <SubCategory
    //   index={props.catIndex}
    //   isActive={props.activeIndex === props.catIndex}
    //   onClick={this.handleClick}
    // />;
  };
  handleClick = index => this.setState({ activeIndex: index });
  onChange = event => {
    this.setState({ resiliencequality: event });
  };
  handleQutionsClick = index => this.setState({ activeIndexQutions: index });
  handleQutionsClick2 = index => this.setState({ activeIndexQutions2: index });
  async getPhysicalName(survey) {
    const  Physical = await companynames(
      "MySurvey",
      "CGI",
      survey,
      "Physical"
    );
    console.log(Physical, "ARRRREEEEEEEE")
    console.log(Physical.data, "ARRRREEEEEEEE")
    this.setState({ Physical: Physical.data});


    const data = Physical.data
    console.log(data, "VVVVV")
    data.map((cat,index) => 
      this.getQuestions("MySurvey", "CGI", survey, "Physical", cat, index)
    );

  }
  async getOrganisationalName(survey) {
    const  Organisational  = await companynames(
      "MySurvey",
      "CGI",
      survey,
      "Organisational"
    );
    this.setState({ Organisational:Organisational.data });

    const data = Organisational.data
    

    data.map((cat,index) => 
      this.getQuestions("MySurvey", "CGI", survey, "Organisational", cat, index)
    );

  }
  async getTechnicalName(survey) {
    const  Technical  = await companynames(
      "MySurvey",
      "CGI",
      survey,
      "Technical"
    );
    this.setState({ Technical:Technical.data });

    const data = Technical.data

    console.log(data, "Technical Checking")
    data.map((cat,index) => 
    this.getQuestions("MySurvey", "CGI", survey, "Technical", cat, index)
  );
  
  }

  async getQuestions(main, company, survey, sector, category, index) {
    console.log(category, index)
    const  questions = await surveyQuestions(
      main,
      company,
      survey,
      sector,
      category
    );

    // console.log(questions, "Final")
    console.log(questions.data, sector, "HAII   ")

      let arr = []
      if( sector === "Physical"){
        arr = this.state.PhysicalQuizQuestions
        arr = arr.concat(questions.data)
        this.setState({ PhysicalQuizQuestions : arr, [category] : questions.data, [category + "Question"] : questions.data[0].question, [category + "QuestionId"] : 1, [category + "Counter"] : 0 })
        // if (index === 0){
        //   this.setState( { PhysicalQuestion :  questions.data[0].question, [category + "Question"] : questions.data[0].question})
        // }
      }else if( sector === "Organisational"){
        arr = this.state.OrganisationalQuizQuestions
        arr = arr.concat(questions.data)
        console.log("HAI    ", questions.data)
        this.setState({ OrganisationalQuizQuestions : arr, [category] : questions.data, [category + "Question"] : questions.data[0].question, [category + "QuestionId"] : 1, [category + "Counter"] : 0 })
        // if (index === 0){
        //   this.setState( { OrganisationalQuestion :  questions.data[0].question, [category + "Question"] : questions.data[0].question})
        // }
      }else{
        arr = this.state.TechnicalQuizQuestions
        arr = arr.concat(questions.data)
        this.setState({ TechnicalQuizQuestions : arr, [category] : questions.data, [category + "Question"] : questions.data[0].question, [category + "QuestionId"] : 1, [category + "Counter"] : 0 })
        // if (index === 0){
        //   this.setState( { TechnicalQuestion :  questions.data[0].question, [category + "Question"] : questions.data[0].question})
        // }
      }

      const kl = this.state[category]

      console.log(kl, "FINA< CHECKKKKKKKKKKK")
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Survey List"
                category=""
                content={
                    <Tabs defaultActiveKey="Physical">
                      <TabList>
                        { this.state.map.map( subsector => <Tab eventKey={subsector} onClick={this.handleChangeTab.bind(this,subsector)}>{subsector}</Tab>) }
                      </TabList>
                      <TabPanel>
                             {<Stepper steps={this.state.Physical} completed={this.state.PhysicalCompleted} handleStep={this.handleStep.bind(this, "Physical")} activeStep={this.state.PhysicalActiveStep}/>}
                      </TabPanel>
                      <TabPanel>
                             {<Stepper steps={this.state.Organisational} completed={this.state.OrganisationalCompleted} handleStep={this.handleStep.bind(this, "Organisational")} activeStep={this.state.OrganisationalActiveStep}/>}
                      </TabPanel>
                      <TabPanel>
                            {<Stepper steps={this.state.Technical} completed={this.state.TechnicalCompleted} handleStep={this.handleStep.bind(this, "Technical")} activeStep={this.state.TechnicalActiveStep}/>}
                      </TabPanel>
                    </Tabs>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Take Survey"
                category=""
                content={
                  <div>
                    { console.log(this.state.tabState, this.state.Technical.length, "HHHHHH")}
                    {/* < FullWidthTabs /> */ console.log("Vignesh",this.state.Physical.length, this.state.PhysicalActiveStep, this.state[this.state.Physical[this.state.PhysicalActiveStep]] )}
                    {this.state.result
                      ? this.renderResult("MySurvey")
                      : (this.state.Physical.length !== 0 && this.state.tabState === "Physical")? this.renderQuiz(this.state.answer, this.state.answerOptions, this.state[this.state.Physical[this.state.PhysicalActiveStep] + "QuestionId"], this.state[this.state.Physical[this.state.PhysicalActiveStep] + "Question"] , this.state.Physical[this.state.PhysicalActiveStep], "Physical") : null}
                      { ( this.state.Technical.length !== 0 && this.state.tabState === "Technical") ? this.renderQuiz(this.state.answer, this.state.answerOptions, this.state[this.state.Technical[this.state.TechnicalActiveStep] + "QuestionId"], this.state[this.state.Technical[this.state.TechnicalActiveStep] + "Question"] , this.state.Technical[this.state.TechnicalActiveStep], "Technical") : null}
                      { ( this.state.Organisational.length !== 0 && this.state.tabState === "Organisational") ? this.renderQuiz(this.state.answer, this.state.answerOptions, this.state[this.state.Organisational[this.state.OrganisationalActiveStep] + "QuestionId"], this.state[this.state.Organisational[this.state.OrganisationalActiveStep] + "Question"] , this.state.Organisational[this.state.OrganisationalActiveStep], "Organisational") : null}
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default SurveyList;
