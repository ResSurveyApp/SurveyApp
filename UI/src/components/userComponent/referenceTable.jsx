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

const theaders = ["Abbreviation","Framework","Publishing Organization","System","Year"]

const tdata = [
        ["NCCIC/ICS-CERT","Recommended Practice: Improving Industrial Control System Cybersecurity with Defense-in-Depth Strategies","Industrial Control Systems Cyber Emergency Response Team","ICS","2016"],
        ["MITRE","Cyber Resiliency Engineering Framework","MITRE Corporation","ITS","2011"],
        ["ISO/IEC 27001","Information Technology, Security Techniques, Information Security Management Systems, Requirements","International Standard Organization (ISO)","ITS","2005"],
        ["CIS CSC","Center for Internet Security Critical Security Control v6","Center for Internet Security (CIS)","ITS","2017"],
        ["NIST SP 800-82","Guide to Industrial Control Systems Security","National Institute of Standards and Technology","ICS","2015"],
        ["NIST SP 800-53","Security and Privacy Controls for Federal Information Systems and Organizations","National Institute of Standards and Technology","ITS","2013"],
        ["NIST CRI ","Framework for Improving Critical Infrastructure Cybersecurity","National Institute of Standards and Technology","ICS","2017"],
        ["COBIT","Control Objectives for Information and Related Technologies","Information Systems Audit and Control Association (ISACA)","ITS","2007"],
        ["ITIL","Information Technology Infrastructure Library","AXELOS","ITS",""],
        ["LINKOV","Resilience Metrics for Cyber Systems","Publication in Environment Systems and Decision Journal","ITS","2013"],
        ["COLBERT","Cybersecurity of SCADA and Other Industrial Control Systems","Book in Advances in Information Security","ICS","2016"],
        ["SAND2014","Conceptual Framework for Developing Resilience Metrics for the Electricity, Oil and Gas Sectors in the United States","Sandia National Laboratory","ICS","2014"],
        ["R4","Conceptualizing and Measuring Resilience, A key to Disaster Loss Reduction","Multidisciplinary Center for Earthquake Engineering Research (MCEER)","Critical infrastructure (physical)","2007"],
        ["ENISA","Good practices guide for CERTs in the area of Industrial Control Systems","European Network and Information Security Agency","ICS","2013"],
        ["DNVGL","Cyber Security Resilience Management for Ships and Mobile Offshore Units in Operation","Det Norske Veritas (Norway) and Germanischer Lloyd (Germany).","",""],
        ["CRR1","Cyber Resilience Review Supplemental Resource Guide, Volume 1, Asset Management","US Computer Emergency Readiness Team and Carnegie Mellon University","Critical Infrastructure","2016"],
        ["CRR2","Cyber Resilience Review Supplemental Resource Guide, Volume 2, Control Management","US Computer Emergency Readiness Team and Carnegie Mellon University","Critical Infrastructure","2016"],
        ["CRR3","Cyber Resilience Review Supplemental Resource Guide, Volume 3, Configuration and Change Management","US Computer Emergency Readiness Team and Carnegie Mellon University","Critical Infrastructure","2016"],
        ["CRR4","Cyber Resilience Review Supplemental Resource Guide, Volume 4, Vulnerability Management","US Computer Emergency Readiness Team and Carnegie Mellon University","Critical Infrastructure","2016"],
        ["CRR5","Cyber Resilience Review Supplemental Resource Guide, Volume 5, Incident Management","US Computer Emergency Readiness Team and Carnegie Mellon University","Critical Infrastructure","2016"],
        ["CRR6","Cyber Resilience Review Supplemental Resource Guide, Volume 6, Service Continuity Management","US Computer Emergency Readiness Team and Carnegie Mellon University","Critical Infrastructure","2016"],
        ["CHAVES","Improving the cyber resilience of Industrial Control Systems","Air Force Institute of Technology","ICS","2017"],
        ["GOLDMAN","Cyber Resilience for Mission Assurance","MITRE Corporation","ITS","2011"],
        ["STRUCT","Structural Vulnerability of The North American Power Grid","Pennsylvania State University","Power system","2004"],
        ["PHYS","Physical Security of the U.S. Power Grid: High-Voltage Transformer Substations","Congressional Research Service","Power system","2014"],
]

const BuildsTable = (props) => {

    
    const { classes } = props;
    const thead= theaders.map((n,index)=>{
      return <TableCell key={index} style={{color:"#174972",background:"#fafafa",fontSize:"15px",fontWeight:"bolder"}}>{n}</TableCell>
  })
   const tbody=[];
   for(let i=0;i<tdata.length;i++){
    let b=[];
     for(let j=0;j<tdata[i].length;j++){
            b.push(<TableCell style={{fontSize:"13px",textOverflow:"ellipsis",overflow:"hidden"}} key={j}>{tdata[i][j]}</TableCell>)
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