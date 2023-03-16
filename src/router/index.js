import React from "react";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route} from "react-router-dom";
import {Dashboard, Login, MainLayout, MasterPPOB, MasterUser, NoMatch} from "../views/pages";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
    const {token, user} = useSelector((state) => state.auth);
    if (!token) {
        return <Navigate to={"/login"} replace />;
    }
    if (user && user.exp < new Date().getTime() / 1000){
        return <Navigate to={"/login"} replace />;
    }

    return <MainLayout />;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="login" element={<Login/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route index element={<Dashboard/>}/>
                <Route path={"master"}>
                    <Route path={"users"} element={<MasterUser/>}/>
                    <Route path={"ppob"} element={<MasterPPOB/>}/>
                </Route>
                <Route path="*" element={<NoMatch/>}/>
            </Route>
        </Route>
    )
)