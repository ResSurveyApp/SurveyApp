import Dashboard from "../layouts/Dashboard/Dashboard.jsx";
// import UserProfile from "../components/userComponent/loginForm";
import ValidateLogin from "../components/userComponent/loginForm";
import AdminDashboard from "../layouts/Dashboard/adminDashboard.jsx";

var indexRoutes = [
  { path: "/users", name: "Home", component: Dashboard },
  {path: "/admin", name: "Admin", component: AdminDashboard},
  { path: "/logintest", name: "logintest", component: ValidateLogin },
];

export default indexRoutes;
