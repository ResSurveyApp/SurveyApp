import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Question from "../qutions/Question";
import FormControlLabelPosition from "../qutions/RadioGroup";
import RadioButton from "../qutions/RadioButton";

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ReviewSurvey = (props) => {

  console.log(props.FinalJson, "hecking in Review")
  
    return (
        <Dialog
          open={props.open}
          maxWidth={'md'}
          fullWidth={true}
          TransitionComponent={Transition}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <span style={{fontSize:"20px", color: "black"}}>Review {props.state.survey}</span>
          </DialogTitle>
          <DialogContent>
            <br/>
              { props.FinalJson.map( (content, index) => {
               return  (
                 <div>
                  <Question content={(index + 1) + ". " + content.question} />
                  <Toolbar className={props.classes.tool}>
                  <Typography variant="h5" color="inherit" align="left">
                    {"Score  :"}
                  </Typography>
                  <FormControlLabelPosition state={props.state} handleChange={props.handleChange(index)} value={content.qscore}/>
                  </Toolbar>
                  <br /><br />
                  <Toolbar className={props.classes.tool}>
                  <Typography variant="h5" color="inherit" align="left">
                    {"Confidence :"}
                  </Typography>
                  <RadioButton confidentLabel={props.state.confidentLabel} handleClick={props.handleClick.bind(this,index)} qconfidence={content.qconfidence}/>
                  </Toolbar>
                 </div>
               )
              } )
              }
              {/* <Table tdata={props.tdata}/> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

export default ReviewSurvey;