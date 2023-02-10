import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BasicForm, Homepage, Login, MainLayout, NoMatch, StepForm} from "../views";
import React from "react";

const index = (props) => {
    let {hasToken} = props
    hasToken = true
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login/>}/>
                {hasToken
                    ?   <Route path="/" element={<MainLayout/>}>
                            <Route index element={<Homepage/>}/>
                            <Route path={"form"}>
                                <Route path={"form-basic"} element={<BasicForm/>}/>
                                <Route path={"form-step"} element={<StepForm/>}/>
                            </Route>
                            {/* Using path="*"" means "match anything", so this route
                                acts like a catch-all for URLs that we don't have explicit
                                routes for. */}
                            <Route path="*" element={<NoMatch/>}/>
                        </Route>
                    :   <Route path="login" element={<Login/>}/>
                }
            </Routes>
        </BrowserRouter>
    )
}

export default index