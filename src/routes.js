import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const results = React.lazy(() => import("./views/results/results"));
const details = React.lazy(() => import("./views/details/details"));
const Users = React.lazy(() => import("./views/Users/Users"));
const CreateUser = React.lazy(() => import("./views/Users/CreateUser"));
const Formik = React.lazy(() => import("./views/Formik/Formik"));
const FormikClass = React.lazy(() => import("./views/Formik/FormikClass"));
const FormBuilder = React.lazy(() =>
  import("./views/FormBuilder2/FormBuilderExample")
);
const Leads = React.lazy(() => import("./views/Leads/Leads"));
const CreateLeads = React.lazy(() => import("./views/Leads/CreateLeads"));
const ImportLeads = React.lazy(()=>import("./views/Leads/ImportLeads"));
const AssignTo = React.lazy(()=>import("./views/AssignTo/AssignTo"));
const callsMade = React.lazy(()=>import("./views/CallsMade/CallsMade"));
const roles = React.lazy(()=>import("./views/Roles/Roles"));
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/results", name: "results", component: results },
  { path: "/roles", name: "roles", component: roles },
  { path: "/details", name: "details", component: details },
  { path: "/users", name: "users", component: Users },
  { path: "/createUser/:id", name: "createUser", component: CreateUser },
  { path: "/leads", name: "Leads", component: Leads },
  { path: "/createLeads/:id", name: "createLeads", component: CreateLeads },
  { path: "/importLeads", name:"ImportLeads" ,component:ImportLeads},
  { path: "/AssignTo", name:"AssginTo" ,component:AssignTo},
  { path: "/CallsMade", name:"CallsMade" ,component:callsMade},
  { path: "/Formik", name: "Formik", exact: true, component: Formik },
  {
    path: "/Formik/FormikClass",
    name: "FormikClass",
    exact: true,
    component: FormikClass,
  },
  { path: "/FormBuilder", name: "Form builder", component: FormBuilder },
];

export default routes;
