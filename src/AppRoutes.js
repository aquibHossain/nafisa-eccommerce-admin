import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "privateRoute";

const AppRoutes = () => {
  const renderRoutes = (routesArray) =>
    routesArray.map((route) => {
      if (route.collapse) {
        // Recursively render nested routes
        return renderRoutes(route.collapse);
      }

      // Wrap private routes with PrivateRoute
      return (
        <Route
          key={route.key}
          path={route.route}
          element={route.auth ? <PrivateRoute>{route.component}</PrivateRoute> : route.component}
        />
      );
    });

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;
