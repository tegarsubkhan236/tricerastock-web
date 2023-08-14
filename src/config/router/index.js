import React from "react";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, useRouteError} from "react-router-dom";
import {
    CoreInventory,
    Dashboard,
    Login,
    MainLayout,
    Page404,
    Report,
    TransactionBuy,
    TransactionSell,
    TransactionSpecial,
    UserAuthority
} from "../../views/pages";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
    const {token, user} = useSelector((state) => state.auth);
    if (!token) {
        return <Navigate to={"/login"} replace/>;
    }
    if (user && user.exp < new Date().getTime() / 1000) {
        return <Navigate to={"/login"} replace/>;
    }

    return <MainLayout/>;
};

const ErrorBoundary = () => {
    const error = useRouteError();
    console.log("errorBoundary", error)
    return <div>{error.message}</div>
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="login" element={<Login/>}/>
            <Route element={<ProtectedRoute/>} errorElement={<ErrorBoundary/>}>
                <Route index element={<Dashboard/>}/>
                <Route path={"master"}>
                    <Route path={"users"} element={<UserAuthority/>}/>
                    <Route path={"inventory"} element={<CoreInventory/>}/>
                </Route>
                <Route path={"transaction"}>
                    <Route path={"buy"} element={<TransactionBuy/>}/>
                    <Route path={"sell"} element={<TransactionSell/>}/>
                    <Route path={"special"} element={<TransactionSpecial/>}/>
                </Route>
                <Route path={"report"} element={<Report/>}/>
                <Route path="*" element={<Page404/>}/>
            </Route>
        </Route>
    )
)