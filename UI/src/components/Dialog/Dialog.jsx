import React from "react";

import Button from '@material-ui/core/Button'; 
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DialogBox = (props) => {

                return(
                      <Dialog
                      open={props.condition}
                      transition={Transition}
                      keepMounted
                      onClose={props.handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                      >
                      <DialogTitle id="alert-dialog-slide-title">
                        <b style={{fontSize:"25px",color:"#217ba7"}}>{props.main}</b>
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <span style={{fontSize:"12px",color:"black"}}>{props.content}</span>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button onClick={props.handleClose} color="secondary">
                          <b>Close</b>
                        </Button>
                      </DialogActions>
                    </Dialog>
    );
  }

  export default DialogBox;