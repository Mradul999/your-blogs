import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const IsAdminPrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser||!currentUser.data.isAdmin) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default IsAdminPrivateRoute;
