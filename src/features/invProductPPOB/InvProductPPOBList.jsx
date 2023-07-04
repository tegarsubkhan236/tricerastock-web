import React from 'react';
import {Tabs} from "antd";
import PPOBListPrepaid from "./InvProductPPOBListPrepaid";
import InvProductPPOBListPasca from "./InvProductPPOBListPasca";

const InvProductPPOBList = () => {
    const items = [
        {
            key: '1',
            label: `Prepaid`,
            children: <PPOBListPrepaid/>,
        },
        {
            key: '2',
            label: `Pasca`,
            children: <InvProductPPOBListPasca/>,
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

export default InvProductPPOBList;