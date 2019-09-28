import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from './UI';
import Auxillary from '../../hoc/Auxillary';
import './RequestPage.css';
import Button from '@material-ui/core/Button';

import admin_graph from '../../assets/img/admin_graph.jpg';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {
  companynamesFromUser,
  companySurveyNamesFromUser,
  reportToMail
  } from "../../services/adminService";

  const MySwal = withReactContent(Swal)

function selectHelper(label,menu,style){
    return{
      elementType:'select',
      label:label,
      menu:menu,
      value:'',
      style:style,
      disabled:false,
      allValues:[],
      error:false
    }
}


class AdminGraph extends Component {


     state = {
        RequestForm:{
            company:selectHelper('Company',[],{"font-size":"14px", "text-align":"left","min-width":"170px"}),
            survey:selectHelper('Survey',[],{"font-size":"14px","text-align":"left","min-width":"170px"}),
        }
        };

    callAPI = async () => {
      let status = false
      const data = await reportToMail(this.state.RequestForm.survey.value, this.state.RequestForm.company.value)
      if(data.status === 200){
        status = true
      }
      return status
    }

    clear = () => {
      let RequestForm = { ...this.state.RequestForm}
      RequestForm.company.value = ""
      RequestForm.survey.value = ""
      RequestForm.survey.menu = []
      this.setState({ RequestForm })
    }

    check = () => {

        MySwal.fire({
            customClass: {
            popup: 'image-class',
            },
            title: 'Please Wait',
            text: 'Reports are Generating',
            onBeforeOpen: () => {
                MySwal.showLoading()
                this.callAPI().then( (status) => {
                  if(status === true){
                    MySwal.fire({
                      customClass: {
                      popup: 'image-class',
                    },
                    type: 'success',
                    title: 'Reports Sent',
                    text: 'Thanks for your patience',
                    }).then( (check)=>{
                        if(check.value){
                        setTimeout(()=>{
                            this.setState({ open : true })
                        },200);
                        }
                    })
                  }else{
                    MySwal.fire({
                      customClass: {
                      popup: 'image-class',
                    },
                    type: 'error',
                    title: 'Reports Failed to Sent',
                    text: 'Sorry for the inconvenience'
                    })
                  }
            })
        }
    })
    }

    handleChange = async (event,InputIdentifier) => {
        const rqForm={
            ...this.state.RequestForm
        }

        console.log(InputIdentifier, "CCC")

        rqForm[InputIdentifier]['value']=event.target.value
        this.setState({RequestForm:rqForm})
        if(InputIdentifier === 'company'){
            await this.getcompanySurveyNames(event.target.value);
        }
    }

    async componentDidMount() {
        await this.getcompanyname();
      }

    async getcompanyname() {
        let rf={...this.state.RequestForm}
        const  cmpnames = await companynamesFromUser();
        rf.company.menu = cmpnames.data
        this.setState({ RequestForm:rf });
      }
      async getcompanySurveyNames(companyName) {
        let rf={...this.state.RequestForm}
        const  surveyname = await companySurveyNamesFromUser(companyName);
        rf.survey.menu = surveyname.data
        this.setState({ RequestForm:rf });
      }

    render() {
        const rf={...this.state.RequestForm}
        let requestArray=[];
        for(let key in rf){         
            requestArray.push({
            id:key,
            config: rf[key]
            })
        }
        const details = requestArray.map((n,index)=>{
                            if(index === 2){
                               return  <Auxillary><br/><Input
                               key={n.id}
                               id={n.id}
                               elementType={n.config.elementType}
                               config={n.config}
                               handleChange={this.handleChange.bind(this)}
                           /></Auxillary>
                            }else{
                                return  <Input
                                key={n.id}
                                id={n.id}
                                elementType={n.config.elementType}
                                config={n.config}
                                handleChange={this.handleChange.bind(this)}
                            />
                            }
                    }
                )
        return(
            <div>
            <Card style={{textAlign:"center" ,height:"550px",borderTop:"8px solid #217ba7",borderBottom:"8px solid #217ba7", backgroundImage:`url(${admin_graph})`,backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundClip:" content-box"}}> 
            <div className="Newcard">
                <Card>
                  <CardContent>
                    <div>{details}</div>
                    <br/>
                      <div>
                          <Button variant="raised" onClick={this.check} className="Newbutton">Submit</Button>
                          <Button variant="raised" onClick={this.clear} style={{backgroundColor:"red",color:"white",fontSize:"14px","margin-right":"20px"}}>Clear</Button>
                      </div> 
                  </CardContent>
                </Card>
                </div>
                </Card>
                </div>
        );
    }
}


export default AdminGraph;