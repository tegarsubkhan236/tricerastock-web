import React, {useState} from 'react';
import {Button, Card, Col, Input, Row, Space, Typography} from "antd";
import {decrement, increment, incrementByAmount, reset} from "./counterSlice";
import {useDispatch, useSelector} from "react-redux";

const CounterFeature = () => {
    const [incrementAmount, setIncrementAmount] = useState(0)
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    return (
        <Card title={"Counter Redux Toolkit"}>
            <Row gutter={32}>
                <Col span={24} style={{textAlign: "center"}}>
                    <Typography.Title level={1}>
                        {count}
                    </Typography.Title>
                </Col>
                <Col span={24} style={{textAlign: "center"}}>
                    <Space wrap>
                        <Button onClick={() => dispatch(increment())} type={"primary"}>
                            +
                        </Button>
                        <Button onClick={() => dispatch(decrement())} type={"primary"} danger>
                            -
                        </Button>
                        <Button onClick={() => {
                            setIncrementAmount(0);
                            dispatch(reset())
                        }} type={"default"}>
                            Reset All
                        </Button>
                        <Input.Group compact>
                            <Input value={incrementAmount}
                                   style={{width: 'calc(100% - 90px)'}}
                                   onChange={(e) => setIncrementAmount(e.target.value)}
                            />
                            <Button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
                                    type="primary">
                                Submit
                            </Button>
                        </Input.Group>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
};

export default CounterFeature;