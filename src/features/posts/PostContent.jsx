import React from 'react';
import {Avatar, List, Space} from "antd";
import {LikeOutlined, StarOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {reactionAdded, selectAllPost} from "./postSlice";
import {formatDistanceToNow, parseISO} from "date-fns";

const PostContent = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectAllPost)
    const users = useSelector((state) => state.users.data);
    const orderData = data.slice().sort((a, b) => b.date.localeCompare(a.date))

    const findUser = (userId) => {
        const author = users?.data?.results.find(user => user.ID === userId)
        return author ? author.username : "unknown user";
    }

    const timeAgo = (timestamp) => {
        if (timestamp) {
            const date = parseISO(timestamp);
            const timePeriod = formatDistanceToNow(date)
            return `${timePeriod} ago`
        }
        return 'unknown date'
    }

    const IconText = ({icon, text, postId, reactionName}) => {
        return (
            <Space onClick={() => dispatch(reactionAdded({postId: postId, reaction: reactionName}))}
                   style={{cursor: "pointer"}}
                   className={"prevent-select"}
            >
                {React.createElement(icon)}{text}
            </Space>
        )
    };

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 2,
            }}
            dataSource={orderData}
            renderItem={(item) => (
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText
                            icon={StarOutlined}
                            text={item.reactions.star}
                            postId={item.id}
                            reactionName={"star"}
                            key="list-vertical-star-o"
                        />,
                        <IconText
                            icon={LikeOutlined}
                            text={item.reactions.like}
                            postId={item.id}
                            reactionName={"like"}
                            key="list-vertical-like-o"/>,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src="https://joesch.moe/api/v1/random"/>}
                        title={item.title}
                        description={<Space>{findUser(item.userId)}|{timeAgo(item.date)}</Space>}
                    />
                    {item.content.substring(0, 200)}...
                </List.Item>
            )}
        />
    );
};

export default PostContent;