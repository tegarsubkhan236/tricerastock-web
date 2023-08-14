import React, {useState, useRef} from "react";
import {Card, Typography} from "antd";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import PanelGroup from "../../../components/PanelGroup";
import MsSupplier from "./MsSupplier";
import MsProduct from "./MsProduct";
import MsProductCategory from "./MsProductCategory";

const listCurrentData = [
    {
        type: "Supplier",
        component: <MsSupplier/>,
        icon: "TeamOutlined",
        color: "#40c9c6",
    },{
        type: "Product Category",
        component: <MsProductCategory/>,
        icon: "ShopOutlined",
        color: "#36a3f7",
    },{
        type: "Store Product",
        component: <MsProduct/>,
        icon: "TagOutlined",
        color: "#f4516c",
    },{
        type: "PPOB Product",
        component: <MsProduct/>,
        icon: "TagsOutlined",
        color: "#f6ab40",
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
                  title={<Typography.Title level={4}>Core Inventory</Typography.Title>}
                  style={{marginBottom: '16px'}}
            >
                <PanelGroup cardList={listCurrentData}
                            handleSetCurrentData={handleSetCurrentData}
                            currentType={currentData.type}
                />
            </Card>
            <Card type={"inner"}
                  title={<Typography.Title level={4}>{currentData.type}</Typography.Title>}
                  style={{marginBottom: '16px'}}
            >
                <SwitchTransition>
                    <CSSTransition timeout={500} classNames="fade" exit={false} nodeRef={nodeRef} key={currentData.type}>
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