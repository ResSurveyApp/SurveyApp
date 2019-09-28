import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Grid, Row, Col } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import Card from "../../components/Card/Card.jsx";
import MyClickable from "./hello";
import MyClickableQutions from "./hellotest";
import { Link } from "react-router-dom";
import "./user.css";
import update from "react-addons-update";
import Quiz from "../qutions/Quiz";
import Result from "../qutions/Result";
// import SubCategory from "./subCategory";

import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

import { companynames, surveyQuestions } from "../services/userServices";
export class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      survey : "",
      activeIndex: null,
      activeIndexQutions: null,
      activeIndexQutions2: null,
      resiliencequality: "",
      counter: 0,
      cmpnames: [],
      Organizational: [],
      map: ["Physical","Organizational","Technical"],
      Physical:[],
      Technical: [],
      questionId: 1,
      question: "",
      answerOptions: [ 1,2,3,4,5],
      answer: "",
      answersCount: {
        Stark: 0,
        Lannister: 0,
        Targaryen: 0
      },
      PhysicalQuizQuestions:[],
      OrganizationalQuizQuestions:[],
      TechnicalQuizQuestions:[],
      result: ""
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }
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
    await this.getOrganizationalName(survey);
    await this.getTechnicalName(survey);
    // await this.getQuestions(survey);
    // console.log(this.props)
   }
  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  handleAnswerSelected(event) {
    // console.log(event.currentTarget.value, this.state.quizQuestions.length)
    // console.log("AAAAAA ")
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < this.state.quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }
  setNextQuestion() {
    const counter = this.state.physicalcounter + 1;
    const questionId = this.state.physicalquestionId + 1;
    // console.log("Vignesh    ", counter, questionId)

    // console.log(this.state.quizQuestions[counter].question)

    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.PhysicalQuizQuestions[counter].question,
      answer: ""
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: "Undetermined" });
    }
  }

  renderQuiz(sector) {
    console.log(sector)
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.PhysicalQuestion}
        questionTotal={this.state.PhysicalQuizQuestions.length}
        onAnswerSelected={()=>this.handleAnswerSelected()}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: { $apply: currentValue => currentValue + 1 }
    });

    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
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
    const  physical = await companynames(
      "MySurvey",
      "CGI",
      survey,
      "Physical"
    );
    // console.log(physical)
    this.setState({ Physical: physical.data});

    const data = physical.data
    data.map((cat,index) => 
      this.getQuestions("MySurvey", "CGI", survey, "Physical", cat, index)
    );

  }
  async getOrganizationalName(survey) {
    const  Organizational  = await companynames(
      "MySurvey",
      "CGI",
      survey,
      "Organisational"
    );
    this.setState({ Organizational:Organizational.data });

    const data = Organizational.data
  }
  async getTechnicalName(survey) {
    const  Technical  = await companynames(
      "MySurvey",
      "CGI",
      survey,
      "Technical"
    );
    this.setState({ Technical:Technical.data });

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

      let arr = []
      if( sector === "Physical"){
        arr = this.state.PhysicalQuizQuestions
        arr = arr.concat(questions.data)
        this.setState({ PhysicalQuizQuestions : arr })
        if (index === 0){
          this.setState( { PhysicalQuestion :  questions.data[0].question})
        }
      }else if( sector === "Organizational"){
        arr = this.state.OrganizationalQuizQuestions
        arr = arr.concat(questions.data)
        this.setState({ OrganizationalQuizQuestions : arr })
        if (index === 0){
          this.setState( { OrganizationalQuestion :  questions.data[0].question})
        }
      }else{
        arr = this.state.TechnicalQuizQuestions
        arr = arr.concat(questions.data)
        this.setState({ TechnicalQuizQuestions : arr })
        if (index === 0){
          this.setState( { TechnicalQuestion :  questions.data[0].question})
        }
      }
  }

  getOrganization() {
    if(this.state.Organizational.length>0)
    return this.state.Organizational.map(org => <Button>{org}</Button>);
  }
  getPhysicalnames() {
    if(this.state.Physical.length>0)
    return this.state.Physical.map(cat => <Button>{cat}</Button>);
  }
  getTechnicalnames() {
    if(this.state.Technical.length>0)
    return this.state.Technical.map(tec => <Button>{tec}</Button>);
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
                  <div>
                    <Tabs>
                      <TabList>
                        <Tab>Physical</Tab>
                        <Tab>Organizational</Tab>
                        <Tab>Technical</Tab>
                      </TabList>
                      <TabPanel>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                          <ButtonGroup
                            className="mr-2"
                            aria-label="First group"
                          >
                             {this.getPhysicalnames()}
                          </ButtonGroup>
                        </ButtonToolbar>
                      </TabPanel>
                      <TabPanel>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                          <ButtonGroup
                            className="mr-2"
                            aria-label="
                            second group"
                          >
                             {this.getOrganization()}
                          </ButtonGroup>
                        </ButtonToolbar>
                      </TabPanel>
                      <TabPanel>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                          <ButtonGroup
                            className="mr-2"
                            aria-label="
                            thred group"
                          >
                            {this.getTechnicalnames()}
                          </ButtonGroup>
                        </ButtonToolbar>
                      </TabPanel>
                    </Tabs>
                  </div>
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
                    {this.renderQuiz("Physical")}
                    {/* {this.state.result
                      ? this.renderResult()
                      : this.renderQuiz()} */}
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
