import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "../../material-dashboard-react.jsx";

const dashboardStyle = {
  successText: {
    color: successColor[0]
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  grow: {
    flexGrow: 1,
    // border: '0.1px solid black',
  },
  lgrow: {
    flexGrow: 1,
    width: '20%',
    // marginRight: '50px',
    marginLeft: '-2%'
    // borderRight: '2px solid #af2cc5',
  },
  cgrow: {
    flexGrow: 1,
    width: '60%',
    // marginLeft: '1%',
    margin: '5px 5px',
    
    // marginTop: '-55px',
    // border: '2px solid #af2cc5',
    // borderRight: '2px solid #af2cc5',
    // borderLeft: '2px solid #af2cc5',
    // border: '2px solid #af2cc5',
  },
  rgrow: {
    width: '16%',
    flexGrow: 1,
    marginRight: '-2%'
    // margin: 't'
    // marginTop: '-5px',
  },
  igrow: {

    // paddingTop : '-30px',
    
    flexGrow: 1,

    // marginTop: '-5px',
    // marginBottom: 'px'
    // position: 'relative'
  },ngrow: {

    // paddingTop : '-30px',
    
    flexGrow: 1,

    // marginTop: '-3px',
    // marginBottom: '10px'
    // position: 'relative'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: -20,
  },
  tool: {
    marginTop: -13,
    marginBottom: -13,
  }
};

export default dashboardStyle;
