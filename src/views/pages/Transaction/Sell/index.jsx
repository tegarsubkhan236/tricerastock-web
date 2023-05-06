import React from 'react';
import {MinusOutlined, PayCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Avatar, List, Space, Card, Col, Row, Typography, Input, Tree, Button} from "antd";
const { Meta } = Card;

const Index = () => {
    const arrProduct = ['1','2','3','4','5','6']

    const treeData = [
        {
            title: '0-0',
            key: '0-0',
            children: [
                {
                    title: '0-0-0',
                    key: '0-0-0',
                    children: [
                        {
                            title: '0-0-0-0',
                            key: '0-0-0-0',
                        },
                        {
                            title: '0-0-0-1',
                            key: '0-0-0-1',
                        },
                        {
                            title: '0-0-0-2',
                            key: '0-0-0-2',
                        },
                    ],
                },
                {
                    title: '0-0-1',
                    key: '0-0-1',
                    children: [
                        {
                            title: '0-0-1-0',
                            key: '0-0-1-0',
                        },
                        {
                            title: '0-0-1-1',
                            key: '0-0-1-1',
                        },
                        {
                            title: '0-0-1-2',
                            key: '0-0-1-2',
                        },
                    ],
                },
                {
                    title: '0-0-2',
                    key: '0-0-2',
                },
            ],
        },
        {
            title: '0-1',
            key: '0-1',
            children: [
                {
                    title: '0-1-0-0',
                    key: '0-1-0-0',
                },
                {
                    title: '0-1-0-1',
                    key: '0-1-0-1',
                },
                {
                    title: '0-1-0-2',
                    key: '0-1-0-2',
                },
            ],
        },
        {
            title: '0-2',
            key: '0-2',
        },
    ];

    const data = [
        {
            title: 'Rp 27.200',
        },
        {
            title: 'Rp 27.200',
        },
        {
            title: 'Rp 27.200',
        },
    ];

    const ListProduct = () => {
        return (
            <Row gutter={13} style={{paddingTop: '15px'}}>
                {arrProduct.map(value => {
                    return (
                        <Col span={6}>
                            <Card
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <MinusOutlined key="setting" />,
                                    <Typography.Title level={5} key="total_product"> 1 </Typography.Title>,
                                    <PlusOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    title="Rp 5.000"
                                    description={value}
                                />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
    }

    return (
        <div className="app-container">
            <Row gutter={5}>
                <Col span={18}>
                    <Card type={"inner"} title={<Typography.Title level={4}>Sell Transaction</Typography.Title>}>
                        <Row>
                            <Col span={6}>
                                <Tree
                                    showLine={true}
                                    checkable
                                    treeData={treeData}
                                />
                            </Col>
                            <Col span={18}>
                                <Input.Search placeholder="input search text" onSearch={(value) => console.log(value)} enterButton />
                                <ListProduct/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card  type={"inner"} title={"  "} style={{minHeight: '500px'}}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item, index) => (
                                <List.Item actions={[
                                    <Space>
                                        <Typography.Title level={5}>X</Typography.Title><Typography.Title level={4}>5</Typography.Title>
                                    </Space>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Dunhill Black 16 batang"
                                    />
                                </List.Item>
                            )}
                            footer={<Button type={"primary"} icon={<PayCircleOutlined/>} block> Checkout</Button>}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Index;