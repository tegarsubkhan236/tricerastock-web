import React from 'react';
import {Col, Row, Space, Card} from 'antd';
import TableBasic from "../../components/Table/TableBasic";
import TypingCard from "../../components/TypingCard";

const BasicTable = () => {
    return (
        <div className="app-container">
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                <TypingCard title='Basic Form' source={`Berikut adalah contoh <strong>BASIC TABLE</strong>...`}/>
                <TableBasic/>
            </Space>
        </div>
    );
};

export default BasicTable;