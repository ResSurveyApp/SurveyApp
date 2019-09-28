import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
// import Chip from '@material-ui/core/Chip';
// import DoneIcon from '@material-ui/icons/Done';

import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  chipWrapper: {
    marginBottom: theme.spacing.unit,
    margin: theme.spacing.unit
  },
  chip: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const ChipsPlayground = (props) => {

    const { classes } = props;
      

    return (

      <Grid container className={classes.root}>
        <Grid item xs={12}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
              <Toolbar className={props.classes.tool}>
                  <Typography variant="h5" color="inherit" align="left">
                    {"Score:"}
                  </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    name="position"
                    aria-label="position"
                    value={props.radioSelect}
                    onChange={props.handleChange}
                  >
                  { props.value.map( (val, index) => {
                  return <FormControlLabel 
                  value={"" + index} 
                  control={<Radio />} 
                  label={<span style={{fontSize:"15px"}}>{val}</span>} 
                  labelPlacement="bottom"/>
                  })}
                  </RadioGroup>
                </FormControl>
                </Toolbar>
              { props.radioSelect !== '' ? 
              <Grid item xs={6}>
                <Grid container justify="left" alignItems="center">
                    <Toolbar className={classes.tool}>
                    <Typography variant="h5" color="inherit" align="left">
                      {"Confidence:"}
                      </Typography>
                    { props.confidentLabel.map( (label, index) => 
                        <Zoom key={index}
                        in={true}
                        unmountOnExit
                    >
                        <Fab
                        variant="extended"
                        size="small"
                        value={index+1}
                        color={props[label + "Color"]}
                        onClick={props.handleClick(label, index)}
                        aria-label={label}
                        className={classes.margin}
                        >
                        <NavigationIcon className={classes.extendedIcon} />
                        {label}
                        </Fab>
                        </Zoom>)}
                        </Toolbar>
                    </Grid>
                </Grid>
            : null }
            </Grid>
            </Grid>
        </Grid>
      </Grid>
    );
  }


export default withStyles(styles)(ChipsPlayground);