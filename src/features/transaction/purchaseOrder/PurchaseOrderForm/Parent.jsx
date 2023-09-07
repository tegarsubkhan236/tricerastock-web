import React, { useContext } from 'react';
import { Button, Steps } from 'antd';
import { PurchaseOrderStepFormContext } from "./index";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const StepsData = [
    {
        title: 'Fill Master Data',
        content: <Step1 />,
    },
    {
        title: 'Pick Products',
        content: <Step2 />,
    },
    {
        title: 'Checkout Order',
        content: <Step3 />,
    },
];

const Parent = () => {
    const { currentStep, prev, isSaved } = useContext(PurchaseOrderStepFormContext);

    const items = StepsData.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <>
            <Steps current={currentStep} items={items} />
            <div style={{ marginTop: 24 }}>
                {StepsData[currentStep].content}
            </div>
            <div style={{ marginTop: 24 }}>
                {currentStep < StepsData.length - 1 && (
                    <Button style={{ float: 'right' }} form="myForm" key="submit" htmlType="submit">
                        Next
                    </Button>
                )}
                {currentStep === StepsData.length - 1 && !isSaved && (
                    <Button style={{ float: 'right' }} form="myForm" key="submit" htmlType="submit" type="primary">
                        Save
                    </Button>
                )}
                {currentStep > 0 && !isSaved && (
                    <Button style={{ margin: '0 8px', float: 'left' }} onClick={prev}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

export default Parent;