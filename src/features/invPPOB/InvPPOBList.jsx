import React from 'react';
import {Tabs} from "antd";
import PPOBListPrepaid from "./InvPPOBListPrepaid";
import InvPPOBListPasca from "./InvPPOBListPasca";

const InvPPOBList = () => {
    const items = [
        {
            key: '1',
            label: `Prepaid`,
            children: <PPOBListPrepaid/>,
        },
        {
            key: '2',
            label: `Pasca`,
            children: <InvPPOBListPasca/>,
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

export default InvPPOBList;