import GuestGuard from "components/authentication/GuestGuard";
import DashboardLayout from "components/Layouts/DashboardLayout";
import LoadingScreen from "components/LoadingScreen";
import AddBlog from "pages/AddBlog/AddBlog";
import AddEvent from "pages/AddEvent/AddEvent";
import BlogCategory from "pages/BlogCategory/BlogCategory";
import BlogPosts from "pages/BlogPosts/BlogPosts";
import Events from "pages/Events/Events";
import Universities from "pages/Universities/Universities";
import UpdateDonor from "pages/UpdateDonor/UpdateDonor";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const ForgetPassword = Loadable(
  lazy(() => import("./pages/authentication/ForgetPassword"))
);

// Dashboard pages
const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

// user profile
const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

// user management
const DonorList = Loadable(
  lazy(() => import("./pages/userManagement/DonorList"))
);
const UserGrid = Loadable(
  lazy(() => import("./pages/userManagement/UserGrid"))
);
const AddNewDonor = Loadable(
  lazy(() => import("./pages/userManagement/AddNewDonor"))
);

// error
const Error = Loadable(lazy(() => import("./pages/404")));

// routes
const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "register",
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: "forget-password",
    element: (
      <GuestGuard>
        <ForgetPassword />
      </GuestGuard>
    ),
  },
  {
    path: "dashboard",
    element: (
      // <AuthGuard>
      <DashboardLayout />
      // </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DashboardSaaS />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },

      {
        path: "donor-list",
        element: <DonorList />,
      },
      {
        path: "user-grid",
        element: <UserGrid />,
      },
      {
        path: "add-donor",
        element: <AddNewDonor />,
      },
      {
        path: "update-donor",
        element: <UpdateDonor />,
      },
      {
        path: "blogs-category",
        element: <BlogCategory />,
      },
      
      {
        path: "blog-posts",
        element: <BlogPosts />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "add-event",
        element: <AddEvent />,
      },
      {
        path: "universities",
        element: <Universities />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
