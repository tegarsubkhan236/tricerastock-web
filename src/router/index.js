import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {Dashboard, Login, MainLayout, MasterUser, NoMatch} from "../views/pages";
import React from "react";

let hasToken = true

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="login" element={<Login/>}/>
            {hasToken
                ?
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={"master"}>
                        <Route path={"users"} element={<MasterUser/>}/>
                    </Route>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
                : <Route path="/" element={<Login/>}/>
            }
        </Route>
    )
)