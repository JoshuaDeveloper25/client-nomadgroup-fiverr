import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppProvider";

const PrivateRoutes = () => {
  const { userInfo } = useContext(AppContext);

  return userInfo?.access_token ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
