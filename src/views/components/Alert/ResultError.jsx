import React from 'react';
import {Button, Result, Typography} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";

const { Paragraph, Text } = Typography;

const ResultError = () => {
    return (
        <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[
                <Button type="primary" key="console">
                    Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
            ]}
        >
            <div className="desc">
                <Paragraph>
                    <Text strong style={{fontSize: 16}}>
                        The content you submitted has the following error:
                    </Text>
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined color={"red"} /> Your account is not yet
                    eligible to apply
                </Paragraph>
            </div>
        </Result>
    );
};

export default ResultError;