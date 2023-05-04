import React from 'react';
import {Tabs} from "antd";
import PPOBListPrepaid from "./MsPPOBListPrepaid";
import MsPPOBListPasca from "./MsPPOBListPasca";

const MsPPOBList = () => {
    const items = [
        {
            key: '1',
            label: `Prepaid`,
            children: <PPOBListPrepaid/>,
        },
        {
            key: '2',
            label: `Pasca`,
            children: <MsPPOBListPasca/>,
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

export default MsPPOBList;