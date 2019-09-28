import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
      </div>

      <Card
                title="Survey List"
                category=""
                content={
                    <Tabs defaultActiveKey="Physical" onSelect={key => this.setState({ tabState: key })} activeKey={this.state.tabState} >
                        { this.state.map.map( subsector => <Tab eventKey={subsector} title={subsector} onClick={this.handleChangeTab.bind(this,subsector)}>{<Stepper steps={this.state[subsector]} completed={this.state[subsector+ "Completed"]} handleStep={this.handleStep.bind(this, subsector)} activeStep={this.state[subsector+ "ActiveStep"]}/>}</Tab>)}
                      {/* <TabPanel>
                             {<Stepper steps={this.state.Physical} completed={this.state.PhysicalCompleted} handleStep={this.handleStep.bind(this, "Physical")} activeStep={this.state.PhysicalActiveStep}/>}
                      </TabPanel>
                      <TabPanel>
                             {<Stepper steps={this.state.Organizational} completed={this.state.OrganisationalCompleted} handleStep={this.handleStep.bind(this, "Organizational")} activeStep={this.state.OrganisationalActiveStep}/>}
                      </TabPanel>
                      <TabPanel>
                            {<Stepper steps={this.state.Technical} completed={this.state.TechnicalCompleted} handleStep={this.handleStep.bind(this, "Technical")} activeStep={this.state.TechnicalActiveStep}/>}
                      </TabPanel> */}
                    </Tabs>
                }
              />
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);