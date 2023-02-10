import React, { useRef, useEffect } from "react";
import { Card } from "antd";
import { PropTypes } from "prop-types";
import Typing from "../../config/utils/typing";

const TypingCard = (props) => {
    const { title, source } = props;

    const sourceEl = useRef();
    const outputEl = useRef();
    const onceRender = useRef(false);

    useEffect(() => {
        if (onceRender.current) return;
        onceRender.current = true;
        const typing = new Typing({
            source: sourceEl.current,
            output: outputEl.current,
            delay: 30,
        });
        console.log('i fire once');
        typing.start();
    }, []);
    return (
        <Card bordered={false} className="card-item" title={title}>
            <div
                style={{ display: "none" }}
                ref={sourceEl}
                dangerouslySetInnerHTML={{ __html: source }}
            />
            <div ref={outputEl} />
        </Card>
    );
};

TypingCard.propTypes = {
    title: PropTypes.string,
    source: PropTypes.string,
};

TypingCard.defaultProps = {
    title: "",
    source: "",
};

export default TypingCard;