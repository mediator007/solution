import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import { authAdmin, authUser, publicRoutes } from "../routes";
import { Context } from "../Context";


const AppRouter = () => {
    const [isAuth, setIsAuth] = React.useContext(Context)
    const isAdmin = false
    return(
        <Routes>
            {isAuth && isAdmin && authAdmin.map(({path, component})=>
                <Route 
                    key={path} path={path} 
                    Component={component}/>
            )}
            {isAuth && authUser.map(({path, component})=>
                <Route 
                    key={path} path={path} 
                    Component={component}/>
            )}
            {publicRoutes.map(({path, component})=>
                <Route 
                    key={path} path={path} 
                    Component={component}/>
            )}
            {(isAuth || isAdmin) && (
                <Route path="*" Component={Main}/>
            )}
            <Route path="*" Component={Login}/>
        </Routes>
    )
};

export default AppRouter;