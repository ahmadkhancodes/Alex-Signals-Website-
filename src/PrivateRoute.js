import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function PrivateRoute({ element: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Navigate to="/" />;
      }}
    />
  );
}
