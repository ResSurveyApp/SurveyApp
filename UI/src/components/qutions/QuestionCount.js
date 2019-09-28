
import React from 'react';
import PropTypes from 'prop-types';
 
function QuestionCount(props) {
	return (
			<h4>Question<span>{props.counter}</span> of <span>{props.total}</span></h4>
 
	);
}
 
QuestionCount.propTypes = {
	counter: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired
};
 
export default QuestionCount;