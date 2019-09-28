import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const styles = theme => ({
  root: {
    width: '90%',
    marginLeft: '-1%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return 'Step 1: Select campaign settings...';
//     case 1:
//       return 'Step 2: What is an ad group anyways?';
//     case 2:
//       return 'Step 3: This is the bit I really care about!';
//     default:
//       return 'Unknown step';
//   }
// }

const StepperComp = (props) => {


    const { classes } = props;
    const steps = props.steps;

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={props.activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={props.handleStep(index, label)} completed={props.completed[index]}>
                <h6>{label}</h6>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }

export default withStyles(styles)(StepperComp);