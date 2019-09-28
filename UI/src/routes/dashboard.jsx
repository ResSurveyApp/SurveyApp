import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
// import TableList from "../views/TableList/TableList";
// import Typography from "../views/Typography/Typography";
// import Icons from "../views/Icons/Icons";
// import Maps from "../views/Maps/Maps";
// import Notifications from "../views/Notifications/Notifications";
// import SurveyUpload from "../views/Admin/surveyUpload";
// import ReleseSurvey from "../views/Admin/releaseSurvey";
// import AdminLogin from "../views/Admin/adminLogin";
// import Upgrade from "../views/Upgrade/Upgrade";
// import ValidateLogin from "../components/userComponent/loginForm";
// import Login from "../components/userComponent/login";
// import UserRegistraion from "../components/userComponent/userRegistration";
import SurveyList from "../components/userComponent/surveyList";
import GraphsDisplay from "../views/Admin/graphs";
import References from "../components/userComponent/referenceTable";

const dashboardRoutes = [
  {
    path: "/users/dashboard",
    name: "Take Survey",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  // {
  //   path: "/users/user",
  //   name: "User Profile",
  //   icon: "pe-7s-user",
  //   component: UserProfile
  // },
  {
    path: "/users/survey",
    name: "Survey List",
    icon: "pe-7s-note2",
    component: SurveyList
  },
  {
    path: "/users/graphsdisplay",
    name: "Survey Graph",
    icon: "pe-7s-note2",
    component: GraphsDisplay
  },
  {
    path: "/users/references",
    name: "REFERENCES",
    icon: "pe-7s-note2",
    component: References
  }
  // {
  //   path: "/uservalidate",
  //   name: "Login Page",
  //   icon: "pe-7s-user",
  //   component: ValidateLogin,
  //   routes: [
  //     {
  //       path: "/uservalidate/registration",
  //       name: "Registration Page",
  //       icon: "pe-7s-user",
  //       component: UserRegistraion
  //     },
  //     {
  //       path: "/uservalidate/login",
  //       name: "Registration Page",
  //       icon: "pe-7s-user",
  //       component: Login
  //     },
  //     {
  //       path: "/uservalidate/survey",
  //       name: "Survey List",
  //       icon: "pe-7s-note2",
  //       component: SurveyList
  //     }
  //   ]
  // },

  // {
  //   path: "/admin",
  //   name: "Admin Login",
  //   icon: "pe-7s-note2",
  //   component: AdminLogin,
  //   routes: [
  //     {
  //       path: "/admin/surveyupload",
  //       name: "Registration Page",
  //       icon: "pe-7s-user",
  //       component: SurveyUpload
  //     },
  //     {
  //       path: "/admin/userdataupload",
  //       name: "Registration Page",
  //       icon: "pe-7s-user",
  //       component: Login
  //     },
  //     {
  //       path: "/admin/releasesurvey",
  //       name: "Survey List",
  //       icon: "pe-7s-note2",
  //       component: ReleseSurvey
  //     }
  //   ]
  // }

  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography
  // },
  // { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "pe-7s-bell",
  //   component: Notifications
  // },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "pe-7s-rocket",
  //   component: Upgrade
  // },
  // { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
