import React from 'react';
import { Button, Result } from 'antd';
import {useNavigate} from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className="app-container">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button onClick={()=>navigate("/")} type="primary">Back Home</Button>}
            />
        </div>
    );
};

export default Page404;