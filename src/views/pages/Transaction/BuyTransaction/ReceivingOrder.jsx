import React, {useState} from 'react';
import {Badge, Button, Card, Col, Modal, Row, Typography} from "antd";
import ReceivingOrderForm from "../../../../features/transaction/receivingOrder/ReceivingOrderForm";
import {NotificationOutlined} from "@ant-design/icons";
import PurchaseOrderTable from "../../../../features/transaction/purchaseOrder/PurchaseOrderTable";
import PurchaseOrderToolkit from "../../../../features/transaction/purchaseOrder/PurchaseOrderTable/PurchaseOrderToolkit";

const ReceivingOrder = () => {
    const pageTitle = "Receiving Order"
    const [showModal, setShowModal] = useState(false)

    const CardTitle = () => {
        return (
            <Row>
                <Col span={9}>
                    <Typography.Title level={4}>{pageTitle}</Typography.Title>
                </Col>
                <Col span={15} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <Button onClick={() => setShowModal(true)}>
                        <Badge count={1000} text={"Pending Order"}>
                            <NotificationOutlined style={{fontSize: 16, marginRight: "5px"}}/>
                        </Badge>
                    </Button>
                </Col>
            </Row>
        )
    }

    return (
        <div className="app-container">
            <Card title={<CardTitle/>}>
                <ReceivingOrderForm/>
            </Card>
            <Modal title={"Pending Order"} open={showModal} onCancel={() => setShowModal(false)} width={1100} footer={null}>
                <Row>
                    {/*<Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>*/}
                    {/*    <PurchaseOrderToolkit/>*/}
                    {/*</Col>*/}
                    <Col span={24}>
                        <PurchaseOrderTable/>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

export default ReceivingOrder;