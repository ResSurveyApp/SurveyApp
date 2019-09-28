import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import MyClickable from "./hello";
export class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="content">
        <TabPanel>
          {/* <RadioGroup
                          onChange={event => this.onChange(event)}
                          vertical
                        >
                          <RadioButton value="Poor">Poor</RadioButton>
                          <RadioButton value="Fair">Fair</RadioButton>
                          <RadioButton value="Good">Good</RadioButton>
                          <RadioButton value="Very Good">Very Good</RadioButton>
                          <RadioButton value="Excellent">Excellent</RadioButton>
                        </RadioGroup>
                        {this.showConfidence()} */}
          <Row>
            <Col md={12}>
              <Card
                title="Select Category"
                category=""
                content={
                  <div
                    className="btn-toolbar"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                  >
                    <div
                      className="btn-group mr-2"
                      role="group"
                      aria-label="First group"
                    >
                      <MyClickable
                        name="Category1"
                        index={props.catIndex}
                        isActive={props.activeIndex === props.catIndex}
                        onClick={this.handleClick}
                      />
                    </div>
                  </div>
                }
              />
            </Col>
          </Row>
        </TabPanel>
      </div>
    );
  }
}

export default SubCategory;
