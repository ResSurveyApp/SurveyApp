import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 900,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const theaders = [0,1,2,3,4]

const tdata = [[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4],[0,1,2,3,4]]

const BuildsTable = (props) => {

    
    const { classes } = props;
    const thead= props.tdata[0].map((n,index)=>{
      return <TableCell key={index} style={{color:"#174972",background:"#fafafa",fontSize:"15px",fontWeight:"bolder",maxWidth:"6em"}}>{n}</TableCell>
  })
   const tbody=[];
   for(let i=1;i<props.tdata.length;i++){
    let b=[];
     for(let j=0;j<props.tdata[i].length;j++){
            b.push(<TableCell style={{fontSize:"13px",textOverflow:"ellipsis",maxWidth:"150px",paddingRight:"20px",overflow:"hidden"}} key={j}>{props.tdata[i][j]}</TableCell>)
     }
     tbody.push(<TableRow  hover={true} key={i}>{b}</TableRow>)
   }

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {thead}
                </TableRow>
            </TableHead>
            <TableBody>
            {tbody} 
            </TableBody>
          </Table>
        </div>
      </Paper>

    );
  }

export default withStyles(styles)(BuildsTable);