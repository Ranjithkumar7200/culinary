import { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loader from "../pages/loader/Loader";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "/",
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
              <Register/>
            </GuestGuard>
          ),
        },
      ],
    },
    {
     
      children: [
        {
          path: "dashboard",
          element: (
            <AuthGuard>
              <DashboardLayout/>
            </AuthGuard>
          ),
          children:[

          ]
        },
        
      ],
    },
    {
      path: "*",
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

const Login = Loadable(lazy(() => import("../pages/loginForms/Login")));
const Register = Loadable(lazy(() => import("../pages/loginForms/Register")));
const DashboardLayout = Loadable(lazy(() => import("../pages/dummy/LandingPage")));
const NotFound = Loadable(lazy(() => import("../pages/404/Page404")));

