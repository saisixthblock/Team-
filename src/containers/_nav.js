import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "roles",
    to: "/roles",
    icon: "cil-star",
  },
  // {
  //   _tag: "CSidebarNavDropdown",
  //   name: "Details",
  //   route: "/details",
  //   icon: "cil-puzzle",
  //   _children: [
  //     {
  //       _tag: "CSidebarNavItem",
  //       name: "detail",
  //       to: "/details/details",
  //     },
  //   ],
  // },
  { _tag: "CSidebarNavItem", name: "users", to: "/users", icon: "cil-user" },
  { _tag: "CSidebarNavItem", name: "Leads", to: "/leads", icon: "cil-phone" },
  { _tag: "CSidebarNavItem", name: "AssignTo", to: "/AssignTo", icon: "cil-pencil" },
  { _tag: "CSidebarNavItem", name: "CallsMade", to: "/CallsMade", icon: "cil-cursor" },
  {
    _tag: "CSidebarNavItem",
    name: "Form builder",
    to: "/FormBuilder",
    icon: "cil-star",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Formik",
    // route: "/Formik",
    icon: "cil-pencil",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Formik",
        to: "/Formik",
      },
      {
        _tag: "CSidebarNavItem",
        name: "FormikClass",
        to: "/Formik/FormikClass",
      },
    ],
  },

  {
    _tag: "CSidebarNavDivider",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Extras"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Pages",
    route: "/pages",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Login",
        to: "/login",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Register",
        to: "/register",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 404",
        to: "/404",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Error 500",
        to: "/500",
      },
    ],
  },
];

export default _nav;
