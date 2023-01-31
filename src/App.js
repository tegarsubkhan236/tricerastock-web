import React from 'react';
import {HashRouter, Routes, Route, BrowserRouter} from "react-router-dom";
import {MainLayout, NoMatch, Homepage, Login} from "./views";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login/>} />
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Homepage />} />
                    {/* Using path="*"" means "match anything", so this route
                    acts like a catch-all for URLs that we don't have explicit
                    routes for. */}
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;