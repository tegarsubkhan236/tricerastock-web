import React from 'react';
import './index.css'
import DocumentTitle from "react-document-title";
import AuthForm from "../../../../features/msAuth/MsAuthForm";

const Index = () => {
    return (
        <DocumentTitle title={"Login - RungkadApp"}>
            <div className="login-container">
                <AuthForm/>
            </div>
        </DocumentTitle>
    );
};

export default Index;