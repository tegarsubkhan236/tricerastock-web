import React, {useState, useRef} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {Card, Typography} from "antd";
import PanelGroup from "./PanelGroup";
import InvReceiving from "./InvReceiving";
import InvPO from "./InvPO";

const Index = () => {
    const nodeRef = useRef(null);
    const listCurrentData = {
        "Purchase Order": {
            type: "Purchase Order",
            component: <InvPO/>
        },
        "Receiving": {
            type: "Receiving",
            component: <InvReceiving/>
        },
    };
    const [currentData, setCurrentData] = useState(
        listCurrentData["Purchase Order"]
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