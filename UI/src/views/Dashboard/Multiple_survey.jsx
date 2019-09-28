import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
});

class MaxWidthDialog extends React.Component {
//   state = {
//     // open: true,
//     // fullWidth: true,
//     // maxWidth: 'sm',
//   };

//   handleClickOpen = () => {
//     this.setState({ open: true });
//   };

//   handleMaxWidthChange = event => {
//     this.setState({ maxWidth: event.target.value });
//   };

//   handleFullWidthChange = event => {
//     this.setState({ fullWidth: event.target.checked });
//   };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open max-width dialog
        </Button> */}
        <Dialog
          fullWidth={true}
          maxWidth='sm'
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
        <DialogTitle id="alert-dialog-slide-title">
            <b style={{fontSize:"25px",color:"#217ba7"}}>Select Survey</b>
        </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You can set my maximum width and whether to adapt or not.
            </DialogContentText> */}
            <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="max-width"><span style={{fontSize:"14px",color:"black"}}>Select Survey</span></InputLabel>
                <Select
                  error={this.props.error}
                  style={{"font-size":"14px","text-align":"left", "min-width":"200px"}}
                  value={this.props.selectedSurvey}
                  onChange={this.props.handleChange}
                  inputProps={{
                    name: 'max-width',
                    id: 'max-width',
                  }}
                >
                  {this.props.allSurvey.map( survey => 
                    <MenuItem value={survey}><span style={{fontSize:"14px","text-align":"left"}}>{survey}</span></MenuItem>
                  )}
                </Select>
              </FormControl>
              {/* <FormControlLabel
                className={classes.formControlLabel}
                control={
                  <Switch
                    checked={this.state.fullWidth}
                    onChange={this.handleFullWidthChange}
                    value="fullWidth"
                  />
                }
                label="Full width"
              /> */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

MaxWidthDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaxWidthDialog);