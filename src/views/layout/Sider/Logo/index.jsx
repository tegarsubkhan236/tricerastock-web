import React from 'react';
import './index.css'
import logo from "../../../../assets/images/ziromart_logo.svg"

const SiderLogo = () => {
    return (
        <div className="sidebar-logo-container">
            <img src={logo} className="sidebar-logo" alt="logo" width={35} height={35}/>
            <h1 className="sidebar-title">Ziromart</h1>
        </div>
    );
};

export default SiderLogo;