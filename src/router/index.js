import React from "react";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, useRouteError} from "react-router-dom";
import {useSelector} from "react-redux";
import MainLayout from "../views/layout/dashboard";
import AuthLayout from "../views/layout/auth";
import Login from "../views/pages/Auth/Login";
import Register from "../views/pages/Auth/Register";
import Dashboard from "../views/pages/Dashboard";
import UserAuthority from "../views/pages/Master/UserAuthority";
import CoreInventory from "../views/pages/Master/CoreInventory";
import Report from "../views/pages/Report";
import Page404 from "../views/error/Page404";
import PurchaseOrder from "../views/pages/Transaction/BuyTransaction/PurchaseOrder";
import ReceivingOrder from "../views/pages/Transaction/BuyTransaction/ReceivingOrder";
import BuyReturnOrder from "../views/pages/Transaction/BuyTransaction/BuyReturnOrder";
import SalesOrder from "../views/pages/Transaction/SellTransaction/SalesOrder";
import SalesReturnOrder from "../views/pages/Transaction/SellTransaction/SalesReturnOrder";


const ProtectedLayout = () => {
    const {token, user} = useSelector((state) => state.auth);
    if (!token) {
        return <Navigate to={"/auth/login"} replace/>;
    }
    if (user && user.exp < new Date().getTime() / 1000) {
        return <Navigate to={"/auth/login"} replace/>;
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
            <Route path="auth" element={<AuthLayout/>}>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"register"} element={<Register/>}/>
            </Route>
            <Route element={<ProtectedLayout/>} errorElement={<ErrorBoundary/>}>
                <Route index element={<Dashboard/>}/>
                <Route path={"user_authority"} element={<UserAuthority/>}/>
                <Route path={"core_inventory"} element={<CoreInventory/>}/>
                <Route path={"buy_transaction"}>
                    <Route path={"purchase_order"} element={<PurchaseOrder/>}/>
                    <Route path={"receiving_order"} element={<ReceivingOrder/>}/>
                    <Route path={"return_order"} element={<BuyReturnOrder/>}/>
                </Route>
                <Route path={"sell_transaction"}>
                    <Route path={"sales_order"} element={<SalesOrder/>}/>
                    <Route path={"return_order"} element={<SalesReturnOrder/>}/>
                </Route>
                <Route path={"report"} element={<Report/>}/>
                <Route path="*" element={<Page404/>}/>
            </Route>
        </Route>
    )
)