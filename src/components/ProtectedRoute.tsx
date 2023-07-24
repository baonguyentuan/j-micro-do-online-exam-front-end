import { Navigate } from "react-router-dom";
import AppRoutes from "../constants/AppRoutes";
import Constants from "../constants/Constants";
import { getLocalStorage } from "../utils/local-storage";

const ProtectedRoute = (props: any) => {
  return getLocalStorage(Constants.localStorageKey.accessToken) !== null ?
    props.children :
    <Navigate to={AppRoutes.public.login} replace />;
};

export default ProtectedRoute;