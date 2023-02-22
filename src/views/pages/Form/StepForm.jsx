import React, { useState } from 'react';
import { Button, message, Steps, Card } from 'antd';
import TypingCard from "../../components/TypingCard";

const StepForm = () => {
    const cardContent = `Berikut adalah contoh <strong>STEP FORM</strong>...`
    const steps = [
        {
            title: 'First',
            content: 'First-content',
        },
        {
            title: 'Second',
            content: 'Second-content',
        },
        {
            title: 'Last',
            content: 'Last-content',
        },
    ];
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <div className="app-container">
            <TypingCard title='Step Form' source={cardContent}/>
            <br/>
            <Card title='Step Form'>
                <Steps current={current} items={items} />
                <div style={{
                    lineHeight: '260px',
                    textAlign: 'center',
                    border: `1px dashed`,
                    marginTop: 16,
                }}>{steps[current].content}</div>
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default StepForm;