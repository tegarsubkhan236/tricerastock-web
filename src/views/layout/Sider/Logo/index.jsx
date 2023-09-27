import React from 'react';
import './index.css'
import {AppSidebarLogo} from "../../../../config/app";

const SiderLogo = () => {
    return (
        <div className="sidebar-logo-container">
            <img src={AppSidebarLogo} className="sidebar-logo" alt="logo" width={35} height={35}/>
            <h1 className="sidebar-title">Ziromart</h1>
        </div>
    );
};

export default SiderLogo;