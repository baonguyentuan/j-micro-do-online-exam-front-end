import { Component,useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DispatchType } from "../redux/configStore";
import { useDispatch } from "react-redux";
import Constants from "../constants/Constants";
import AppRoutes from "../constants/AppRoutes";
import { getUserInfoApi } from "../redux/reducers/user/userSlice";

const withAuth = (Component: any)=>{
  const AuthenticatedComponent = (props: any)=>{
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: DispatchType = useDispatch();
    const [loading,setLoading] = useState(true);
    
    useEffect(()=>{
      const fetchUser = async ()=>{
        const token = localStorage.getItem(Constants.localStorageKey.accessToken);
        if(!token){
          navigate(`${AppRoutes.public.login}?redirect=${location}`)
        }
        
        //fetch user data
        const userInfo = await dispatch(getUserInfoApi());
        
      }
      
      fetchUser();
      
    },[])
    
    return(
      <>
        <Component {...props}/>
      </>
    )
  }
  
  return AuthenticatedComponent;
}

export default withAuth;