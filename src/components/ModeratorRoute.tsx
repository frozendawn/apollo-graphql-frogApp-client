import React, { useContext } from "react";
import AuthentinticationContext from "../store/auth-context";
import { Outlet, Navigate } from "react-router-dom";

interface Props {

}

const ModeratorRoute: React.FC<Props> = () => {
  const authCtx = useContext(AuthentinticationContext);
  const role = authCtx.user?.role === 'admin';
  return (
    role ? <Outlet/> : <Navigate to="/" replace/>
  )
};

export default ModeratorRoute;