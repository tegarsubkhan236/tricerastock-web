import React from 'react';
import {Tabs} from "antd";
import PPOBListPrepaid from "./MsProductPPOBListPrepaid";
import MsProductPPOBListPasca from "./MsProductPPOBListPasca";

const MsProductPPOBList = () => {
    const items = [
        {
            key: '1',
            label: `Prepaid`,
            children: <PPOBListPrepaid/>,
        },
        {
            key: '2',
            label: `Pasca`,
            children: <MsProductPPOBListPasca/>,
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
        />
    );
};

export default MsProductPPOBList;