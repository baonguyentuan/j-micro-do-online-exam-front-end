import AppRoutes from "../constants/AppRoutes";
import Constants from "../constants/Constants";
import { Navigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "../utils/local-storage";

const ProtectedRoute = (props: any) => {
  const location = useLocation();
  
  const checkUserExamValidAction = () => {
    const token = getLocalStorage(Constants.localStorageKey.userExamToken);
    
    if ((location.pathname.includes("/takeContest")
      || location.pathname.includes(AppRoutes.private.user.feedback)) && token) {
      return true;
    }

    return false;
  };

  return getLocalStorage(Constants.localStorageKey.accessToken) !== null
  || checkUserExamValidAction() ?
    props.children :
    <Navigate to={AppRoutes.public.login} replace />;
};

export default ProtectedRoute;