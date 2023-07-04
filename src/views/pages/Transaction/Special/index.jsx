import React, {useState, useRef} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {Card, Typography} from "antd";
import PanelGroup from "../../../components/PanelGroup";
import InvBo from "./InvBO";
import InvReturnBuy from "./InvReturnBuy";
import InvReturnSell from "./InvReturnSell";

const listCurrentData = [
    {
        type: "Back Order",
        component: <InvBo/>,
        icon: "TeamOutlined",
        color: "#40c9c6",
    }, {
        type: "Return Buy",
        component: <InvReturnBuy/>,
        icon: "TeamOutlined",
        color: "#40c9c6",
    }, {
        type: "Return Sell",
        component: <InvReturnSell/>,
        icon: "TeamOutlined",
        color: "#40c9c6",
    },
];

const Index = () => {
    const nodeRef = useRef(null);
    const [currentData, setCurrentData] = useState(listCurrentData[0])

    const handleSetCurrentData = (type) => {
        const filterCurrentData = listCurrentData.findIndex((v) => v.type === type)
        setCurrentData(listCurrentData[filterCurrentData])
    };

    return (
        <div className="app-container">
            <Card type={"inner"}
                  title={<Typography.Title level={4}>Special Transaction</Typography.Title>}
                  style={{marginBottom: '16px'}}
            >
                <PanelGroup cardList={listCurrentData}
                            handleSetCurrentData={handleSetCurrentData}
                            currentType={currentData.type}
                />
            </Card>
            <Card
                type={"inner"}
                title={<Typography.Title level={4}>{currentData.type}</Typography.Title>}
                style={{marginBottom: '16px'}}
            >
                <SwitchTransition>
                    <CSSTransition
                        timeout={500}
                        classNames="fade"
                        exit={false}
                        nodeRef={nodeRef}
                        key={currentData.type}
                    >
                        {() => (
                            <div ref={nodeRef}>
                                {currentData.component}
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </Card>
        </div>
    );
};

export default Index;