import React from 'react';
import {Alert} from "antd";

const DynamicAlert = ({alertMessage = [], alertType = "", alertOnClose}) => {
    if (alertType !== "success" && alertType !== "error") {
        return null;
    }

    return (
        <>
            {alertMessage.map((value, index) => {
                return (
                    <Alert
                        key={`alert-${index}`}
                        message={value}
                        type={alertType}
                        banner
                        closable
                        onClose={alertOnClose}
                        style={{marginBottom: "20px"}}
                    />
                )
            })}
        </>
    );
};

export default DynamicAlert;