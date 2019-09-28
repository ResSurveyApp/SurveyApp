import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  chipWrapper: {
    marginBottom: theme.spacing.unit,
    margin: theme.spacing.unit,
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

const handleClicks = (index, score) => {

    if(score === index){
        return "secondary"
    }else{
        return "default"
    }
}

const RadioButtons = (props) => {

    const { classes } = props;
      

    return (
              
                <Grid >
                    { props.confidentLabel.map( (label, index) => 
                        <Zoom key={index}
                        in={true}
                        unmountOnExit
                        >
                        <Fab
                        variant="extended"
                        size="small"
                        value={index+1}
                        color={handleClicks("" + (index + 1), props.qconfidence)}
                        onClick={props.handleClick(label, index + 1)}
                        aria-label={label}
                        className={classes.margin}
                        >
                        <NavigationIcon className={classes.extendedIcon} />
                        {label}
                        </Fab>
                        </Zoom>
                        )}
                    </Grid>
    );
}

export default withStyles(styles)(RadioButtons);