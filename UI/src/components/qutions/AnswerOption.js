
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
 
 
const styles = {
	root: {
	  color: green[600],
	  '&$checked': {
		color: green[500],
	  },
	},
	checked: {},
};

function AnswerOption(props,event) {
	console.log(props,event, "VVVVVVVVVVVVVVVVV")
	return (
			<FormControlLabel
        value="top"
        control={<Radio
				onChange={props.onAnswerSelected}
				disabled={false}
				id={props.answerType}
				value={props.answerType}
				name="radio-button-demo"
				aria-label="A"
        	/>}
            label={props.answerContent}
            labelPlacement="top"
          />
	);
}
 
AnswerOption.propTypes = {
	answerType: PropTypes.string.isRequired,
	answerContent: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,
	OnAnswerSelected: PropTypes.string.isRequired,
};
 
export default withStyles(styles)(AnswerOption);