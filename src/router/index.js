import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Form, Homepage, Login, MainLayout, NoMatch} from "../views";
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
                            <Route path={"form"} element={<Form/>}/>
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