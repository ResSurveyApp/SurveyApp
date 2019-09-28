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
import quizQuestions from "../qutions/quizQuestions";
import Quiz from "../qutions/Quiz";
import Result from "../qutions/Result";
// import SubCategory from "./subCategory";

import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

import { companynames, surveyQuestions } from "../services/userServices";
export class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      activeIndexQutions: null,
      activeIndexQutions2: null,
      resiliencequality: "",
      counter: 0,
      cmpnames: [],
      organizational: [],
      Physical:[],
      technical: [],
      questionId: 1,
      question: "",
      answerOptions: [],
      answer: "",
      answersCount: {
        Stark: 0,
        Lannister: 0,
        Targaryen: 0
      },
      result: ""
    };
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }
  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    console.log(quizQuestions)
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }
  async getcompanyname() {
    const { cmpnames } = await companynames();
    this.setState({ cmpnames });
  }
   async componentDidMount() {
     await this.getPhysicalName();
    await this.getOrganizationalName();
    await this.getTechnicalName();
   }
  shuffleArray(array) {
    console.log(array)
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
    console.log(array)

    return array;
  }
  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }
  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
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

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
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
  async getPhysicalName(
    Survey_name,
    company_name,
    sector_name,
    sub_sector_name
  ) {
    const  physical = await companynames(
      "MySurvey",
      "CGI",
      "R1",
      "Physical"
    );
    console.log(physical)
    this.setState({ Physical: physical.data});
  }
  async getOrganizationalName(
    Survey_name,
    company_name,
    sector_name,
    sub_sector_name
  ) {
    const  organizational  = await companynames(
      "MySurvey",
      "CGI",
      "R1",
      "Organisational"
    );
    this.setState({ organizational:organizational.data });
  }
  async getTechnicalName(
    Survey_name,
    company_name,
    sector_name,
    sub_sector_name
  ) {
    const  technical  = await companynames(
      "MySurvey",
      "CGI",
      "R1",
      "Technical"
    );
    this.setState({ technical:technical.data });
  }
  getOrganization() {
    if(this.state.organizational.length>0)
    return this.state.organizational.map(org => <Button>{org}</Button>);
  }
  getPhysicalnames() {
    if(this.state.Physical.length>0)
    return this.state.Physical.map(cat => <Button>{cat}</Button>);
  }
  gettechnicalnames() {
    if(this.state.technical.length>0)
    return this.state.technical.map(tec => <Button>{tec}</Button>);
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
                            {this.gettechnicalnames()}
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
                    {this.state.result
                      ? this.renderResult()
                      : this.renderQuiz()}
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
