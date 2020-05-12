import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Cookies from 'js-cookie'

function isLogin(){
     
    if(Cookies.get('adtoken'))    
    {
       return true
     
          
          
    }
    else{
      return false;
    }

}
export const ProtectedCRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        const check=isLogin()
        if (isLogin()) {
           
          return <Component {...props} />;
        } else {
          return <Redirect
          to={{
            pathname: "/Clogin",
            state: {
              from: props.location
            }
          }}
        />
        }
      }}
    />
  );
};