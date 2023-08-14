import React from 'react';
import {Col, Row} from "antd";
import MsSupplierList from "../../../../features/master/msSupplier/MsSupplierList";
import MsSupplierForm from "../../../../features/master/msSupplier/MsSupplierForm";
import MsSupplierToolkit from "../../../../features/master/msSupplier/MsSupplierToolkit";

const MsSupplier = () => {
    return (
        <Row>
            <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                <MsSupplierToolkit/>
            </Col>
            <Col span={24}>
                <MsSupplierList/>
            </Col>
            <MsSupplierForm/>
        </Row>
    );
};

export default MsSupplier;