import React from 'react';
import {ExclamationCircleFilled} from "@ant-design/icons";

const Index = ({
                   title = 'Do you want to delete these items?',
                   content = 'When clicked the OK button, this dialog will be closed after 1 second',
                   onOk,
                   onCancel = {}
               }) => {
    confirm({
        title: title,
        icon: <ExclamationCircleFilled/>,
        content: content,
        onOk() {
            return onOk
        }, onCancel() {
            return onCancel
        },
    });
};

export default Index;