import React, { useState } from 'react';


const AuthContext =  React.createContext({
    token:'',
    isLoggedIn :false,
    login:(token)=>{},
    logout:()=>{}
})

 export const AuthContextProvider = (props)=>{
     const initialToken =  localStorage.getItem('token')
    const [token,setToken] = useState(initialToken);
    const userLoggedIn = !!token;

    const loggingInHandler = (token) =>{
        setToken(token);
        localStorage.setItem('token',token);
    }
    const loggingOutHandler = ()=>{
        setToken(null);
        localStorage.removeItem('token')
    }

    const value = {
        token:token,
        isLoggedIn:userLoggedIn,
        login:loggingInHandler,
        logout:loggingOutHandler
    }
    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext;