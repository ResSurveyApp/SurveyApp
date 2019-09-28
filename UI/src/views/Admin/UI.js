import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Auxillary from '../../hoc/Auxillary';
import FormControl from '@material-ui/core/FormControl';


const Inputs=(props)=>{
    
    return (
        <FormControl style={{margin:"10px"}}>
            <Auxillary>
            <InputLabel style={props.config.style} htmlFor="controlled-open-select">{props.config.label}</InputLabel>
            <Select
                value={props.config.value}
                style= {props.config.style}
                error={props.config.error}
                disabled={props.config.disabled}
                onChange={(event)=>props.handleChange(event,props.id)}
                inputProps={{
                name: 'age',
                id: 'controlled-open-select',
                }}>
                <MenuItem style= {{fontSize:"14px"}} value="">
                <em>{props.config.label}</em>
                </MenuItem>
                {props.config.menu.map((d,index)=> <MenuItem 
                key={index}
                style= {{fontSize:"14px"}} 
                value={d}>{d}</MenuItem>
                )}
            </Select>
            </Auxillary>
        </FormControl>
    )
}

export default Inputs;