import React, { useContext } from "react";
import AuthentinticationContext from "../store/auth-context";
import { Outlet, Navigate } from "react-router-dom";

interface Props {}

const ProtectedRoute: React.FC<Props> = () => {
  const authCtx = useContext(AuthentinticationContext);
  return (
    authCtx.isLoggedIn ? <Outlet/> : <Navigate to="/" replace/>

  )
};

export default ProtectedRoute;
