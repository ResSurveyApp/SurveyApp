import React from "react";
import PropTypes from "prop-types";

import Question from "./Question";
import QuestionCount from "./QuestionCount";
// import AnswerOption from "./AnswerOption";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

// import DetailedExpansionPanel from "./Expansion";

import ChipsPlayground from "./ChipsPlayground";

function Quiz(props) {

  // function renderAnswerOptions(key) {
  //   return (
  //     <AnswerOption
  //       key={key.content}
  //       answerContent={key.content}
  //       answerType={key.type}
  //       answer={props.answer}
  //       questionId={props.questionId}
  //       onAnswerSelected={props.onAnswerSelected}
  //     />
  //   );
  // }

  return (
    <ReactCSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        <ul className="answerOptions">
          {/* { console.log(props.onAnswerSelected.event, "Check by Vigneshsssssss")} */}
          {/* {props.answerOptions.map(renderAnswerOptions)} */}
          {/* <DetailedExpansionPanel/> */}
          <ChipsPlayground handleClick={props.handleClick.bind(this)} 
          radioSelect={props.radioSelect} value={props.value} 
          handleChange={props.handleChange} confidentLabel={props.confidentLabel} SlightColor={props.SlightColor} CompletelyColor={props.CompletelyColor} NoColor={props.NoColor} SomewhatColor={props.SomewhatColor} FairlyColor={props.FairlyColor}/>
        </ul>
      </div>
    </ReactCSSTransitionGroup>
  );
}

Quiz.propTypes = {
  counter: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired
};

export default Quiz;
