import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  
 
  
  if (!token || token === "undefined" || token === "null") {
  
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (e) {
    user = null;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!user || !allowedRoles.includes(user?.role)) {
     
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
