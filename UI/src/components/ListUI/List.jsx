import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from "../../../node_modules/react-bootstrap/lib/Table";
import './ListUI.css';

function AlignItemsList(props) {
  const { classes } = props;
  return (
    <div className="content">
    <Card style={{width:"100%",marginTop:"1em"}}>
          <CardContent>
          <div style={{fontSize:"16px",color:"#174972", fontWeight: "bold"}}>
          CRAT</div>
<br/>
            {/* <br/> */}
    <p>Cyber Resilience Assessment Tool (CRAT) is a research product of the collaborative effort by
Dr. Sachin Shetty and Reliability First Corporation. Dr. Shetty from Old Dominion University
and Bheshaj Krishnappa from Reliability First Corporation are collaborating to develop a
qualitative framework for cyber risk and resilience assessment for Cyber-Physical Systems
(CPS). This qualitative tool can quantify the cyber resilience metrics using a set of
questionnaires and generate reports that would guide the cyber security experts in the CPS
domain to make the system cyber resilient and robust.</p>
<br/>
{/* <br/> */}
<div style={{fontSize:"16px",color:"#174972", fontWeight: "bold"}}>
RESEARCH OBJECTIVES</div>
<br/>
<ul style={{fontSize:"15px"}}>
<li>Security audit of Cyber-Physical Systems</li>
<br/>
<li>Security analytics (resilience, robustness, redundancy, rapidity, resourcefulness)
modeling, quantification and analysis</li>
<br/>
<li>Provide an overall understanding of the CPS resilience posture in the Technical,
Organizational and Physical sub-domain</li></ul>
<br/>
{/* <br/> */}
          <Table>
          <thead >
            <tr >
              <th style={{fontSize:"15px",color:"#174972", fontWeight: "bold"}}>Researchers</th>
              <th style={{fontSize:"15px",color:"#174972", fontWeight: "bold"}}>Details</th>
              <th style={{fontSize:"15px",color:"#174972", fontWeight: "bold"}}>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr. Sachin Shetty - Advisor</td>
              <td>Associate Professor, VMASC/MSVE
                <br/>Old Dominion University, Norfolk, VA, USA.</td>
              <td>sshetty@odu.edu</td>
            </tr>
            <tr>
              <td>Mr. Bheshaj Krishnappa - Industry Expert</td>
              <td>Principal, Risk Analysis and Mitigation,
                <br/>ReliabilityFirst Corporation, Cleaveland, OH, USA.</td>
              <td>bheshaj.krishnappa@rfirst.org</td>
            </tr>
            <tr>
              <td>Md Ariful Haque - Ph.D. Student</td>
              <td>PhD Student, MSVE Department
              <br/> Old Dominion University, Norfolk, VA, USA.</td>
              <td>mhaqu001@odu.edu</td>
            </tr>
          </tbody>
        </Table>
          </CardContent>
        </Card>

    {/* <List className={classes.root}>
      <ListItem alignItems="flex-start">
         <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar> 
        <ListItemText
          primary="Advisor: Dr. Sachin Shetty, Associate Professor,"
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography component="span" className={classes.inline} color="textPrimary">
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List> */}
    </div>
  );
}

export default AlignItemsList;
