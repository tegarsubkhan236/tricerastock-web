import React, {useState, useRef} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {Card, Typography} from "antd";
import PanelGroup from "./PanelGroup";
import InvBo from "./InvBO";
import InvReturnBuy from "./InvReturnBuy";
import InvReturnSell from "./InvReturnSell";

const Index = () => {
    const nodeRef = useRef(null);
    const listCurrentData = {
        "Back Order": {
            type: "Back Order",
            component: <InvBo/>
        },
        "Return Buy": {
            type: "Return Buy",
            component: <InvReturnBuy/>
        },
        "Return Sell": {
            type: "Return Sell",
            component: <InvReturnSell/>
        },
    };
    const [currentData, setCurrentData] = useState(
        listCurrentData["Back Order"]
    )

    const handleSetCurrentData = (type) => setCurrentData(listCurrentData[type]);

    return (
        <div className="app-container">
            <Card
                type={"inner"}
                title={<Typography.Title level={4}>Buy Transaction</Typography.Title>}
            >
                <PanelGroup handleSetCurrentData={handleSetCurrentData} currentType={currentData.type}/>
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