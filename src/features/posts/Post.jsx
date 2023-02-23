import React from 'react';
import {Card, Col, Row} from "antd";
import PostContent from "./PostContent";
import PostForm from "./PostForm";

const Post = () => {
    return (
        <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col span={6}>
                <Card title={"Post Form"}>
                    <PostForm/>
                </Card>
            </Col>
            <Col span={18}>
                <Card title={"Post List"}>
                    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                        <PostContent/>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default Post;