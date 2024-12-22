import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAsset } from "../context/AssetContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useAsset();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
