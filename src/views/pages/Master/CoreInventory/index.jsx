import React, {useState, useRef} from "react";
import {Card, Typography} from "antd";
import PanelGroup from "./PanelGroup";
import InvSupplier from "./InvSupplier";
import InvProduct from "./InvProduct";
import InvProductCategory from "./InvProductCategory";
import InvStock from "./InvStock";
import {CSSTransition, SwitchTransition} from "react-transition-group";

const Index = () => {
    const nodeRef = useRef(null);
    const listCurrentData = {
        "Supplier": {
            type: "Supplier",
            component: <InvSupplier/>
        },
        "Product Category": {
            type: "Product Category",
            component: <InvProductCategory/>
        },
        "Product": {
            type: "Product",
            component: <InvProduct/>
        },
        "Stock": {
            type: "Stock",
            component: <InvStock/>
        },
    };
    const [currentData, setCurrentData] = useState(
        listCurrentData["Supplier"]
    )

    const handleSetCurrentData = (type) => setCurrentData(listCurrentData[type]);

    return (
        <div className="app-container">
            <Card
                type={"inner"}
                title={<Typography.Title level={4}>Core Inventory</Typography.Title>}
                style={{marginBottom: '16px'}}
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
    )
}
export default Index