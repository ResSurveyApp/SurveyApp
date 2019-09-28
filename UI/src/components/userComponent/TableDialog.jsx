import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Table from './Table';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const AlertDialogSlide = (props) => {
  
    return (
        <Dialog
          open={props.open}
          maxWidth={'md'}
          TransitionComponent={Transition}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"User DashBoard"}
          </DialogTitle>
          <DialogContent>
            <br/>
              <Table tdata={props.tdata}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    );
  }

export default AlertDialogSlide;