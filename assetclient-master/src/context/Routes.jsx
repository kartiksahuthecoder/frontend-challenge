import React, { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { ProetectedRoute } from "./ProetectedRoute";
import { elements } from "chart.js";

const Routes = () => {
  const { token } = useAuth();
  const routesPublic = [
    {
      path: "/",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ];
  const routesForAuthenticatedOnly = [
    {
      path: "/body",
      element: <ProetectedRoute />,
    },
    (children = [
      {
        path: "/body",
        element: <Body />,
      },
      {
        path: "/assetDetails/:id",
        element: <AssetDetailsPage />,
      },
    ]),
  ];
  const router = createBrowserRouter([
    ...routesPublic,
    ...routesForAuthenticatedOnly,
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
