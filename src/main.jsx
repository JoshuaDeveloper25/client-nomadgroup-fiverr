// --> React, styles of main css and react...
import { AppProvider } from "./context/AppProvider";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

// --> External package imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// --> Pages imports
import Root from "./pages/Root";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import Verified from "./pages/Verified/Verified";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ForgotPasswordToken from "./pages/ForgotPassword/ForgotPasswordToken";
import ForgotPasswordCheckEmail from "./pages/ForgotPassword/ForgotPasswordCheckEmail";
import Events from "./pages/Events/Events";

// --> Public and private routes
import PublicRoutes from "./auth/PublicRoutes";
import PrivateRoutes from "./auth/PrivateRoutes";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import CheckEmailSignUp from "./pages/SignUp/components/CheckEmailSignUp";
import CreateGuest from "./pages/CreateGuest/CreateGuest";

// --> Pages
const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <LogIn />,
            index: true,
          },
        ],
      },

      {
        element: <Verified />,
        path: "/verified/:token",
      },

      {
        element: <ForgotPassword />,
        path: "/forgot-password/",
      },

      {
        element: <ForgotPasswordToken />,
        path: "/forgot-password/:token",
      },

      {
        element: <ForgotPasswordCheckEmail />,
        path: "/forgot-password-check-email",
      },

      {
        element: <SignUp />,
        path: "/sign-up",
      },

      {
        element: <CheckEmailSignUp />,
        path: "/sign-up-check-email",
      },

      {
        element: <CreateGuest />,
        path: "/create-guest",
      },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <Root />,
        children: [
          {
            element: <Events />,
            path: "/events",
          },

          {
            element: <CreateEvent />,
            path: "/create-event",
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" stacked />
      </QueryClientProvider>
    </AppProvider>
  </>
);
