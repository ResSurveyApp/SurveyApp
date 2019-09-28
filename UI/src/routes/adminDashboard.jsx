import SurveyUpload from "../views/Admin/surveyUpload";
import ReleseSurvey from "../views/Admin/releaseSurvey";
import UserUpload from "../views/Admin/userUpload";
import GraphsDisplay from "../views/Admin/adminGraph";
import ReportsDisplay from "../views/Admin/reportsGraph";
import Admin from "../components/ListUI/List";

const dashboardRoutes = [
  {
    path: "/admin",
    name: "Cyber Resilience Assessment Tool",
    icon: "pe-7s-note2",
    component: Admin
  },
  {
    path: "/admin/surveyupload",
    name: "Upload Survey",
    icon: "pe-7s-note2",
    component: SurveyUpload
  },
  {
    path: "/admin/userdataupload",
    name: "Upload User Data",
    icon: "pe-7s-user",
    component: UserUpload
  },
  {
    path: "/admin/releasesurvey",
    name: "Release Survey",
    icon: "pe-7s-note2",
    component: ReleseSurvey
  },
  {
    path: "/admin/graph",
    name: "Reports",
    icon: "pe-7s-note2",
    component: GraphsDisplay
  },
  {
    path: "/admin/reports",
    name: "Metrics/Assessments Report",
    icon: "pe-7s-note2",
    component: ReportsDisplay
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
