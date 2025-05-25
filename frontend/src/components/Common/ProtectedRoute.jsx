import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  // If user is logged in but doesn't have the required role, redirect to home
  if (role && user.role !== role) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
