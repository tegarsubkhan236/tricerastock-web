import {createBrowserRouter, Route, createRoutesFromElements} from "react-router-dom";
import {BasicForm, Homepage, Login, MainLayout, NoMatch, StepForm, BasicTable, Counter} from "../views";
import React from "react";

let hasToken = true

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="login" element={<Login/>}/>
            {hasToken
                ?
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path={"form"}>
                        <Route path={"form-basic"} element={<BasicForm/>}/>
                        <Route path={"form-step"} element={<StepForm/>}/>
                    </Route>
                    <Route path={"table"}>
                        <Route path={"table-basic"} element={<BasicTable/>}/>
                    </Route>
                    <Route path={"redux-example"}>
                        <Route path={"counter"} element={<Counter/>}/>
                    </Route>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
                : <Route path="/" element={<Login/>}/>
            }
        </Route>
    )
)