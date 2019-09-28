import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import RadioButton from './RadioButton';

class FormControlLabelPosition extends React.Component {

  render() {
    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.props.value}
          onChange={this.props.handleChange}
          row
        >
        { this.props.state.value.map( ( value, index ) => {

            return <FormControlLabel
            value={"" + index}
            control={<Radio color="primary" />}
            label={<span style={{fontSize:"14px"}}>{value}</span>}
            labelPlacement="bottom"
          />
        })}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default FormControlLabelPosition;