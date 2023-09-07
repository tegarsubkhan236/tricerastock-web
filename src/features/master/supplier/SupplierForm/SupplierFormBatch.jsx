import React, {useState} from 'react';
import {InboxOutlined} from "@ant-design/icons";
import {Form, message, Upload} from "antd";
import {useDispatch} from "react-redux";
import {postSupplier, setSupplierModalVisible, setSupplierStatus,} from "../supplierSlice";
import {importExcel} from "../../../../config/lib/importExcel";

const SupplierFormBatch = () => {
    const dispatch = useDispatch()
    const [batchData, setBatchData] = useState([])

    const handleSubmit = async () => {
        try {
            await dispatch(postSupplier({postData: batchData})).unwrap()
            await dispatch(setSupplierStatus("idle"))
            await dispatch(setSupplierModalVisible(false))
            // await dispatch(setSupplierSuccessMessage(['Excel file uploaded successfully.']))
        } catch (e) {
            console.log("handleSubmit", e);
            if (e.status === 500) {
                // await dispatch(setSupplierErrorMessage(["Internal Server Error"]))
            }
        }
    }

    const handleSubmitFailed = (e) => {
        console.log(e)
    }

    const handleFileUpload = async (file) => {
        try {
            const data = await importExcel(file);
            const updatedData = data.map((obj) => ({
                name: obj[1],
                address: obj[2],
                contact_person: obj[3],
                contact_number: obj[4],
            }));
            setBatchData(updatedData);
        } catch (error) {
            console.error("handleFileUpload error", error);
        }
    };


    const UploadConfig = {
        name:"batch_supplier_data",
        accept:".xlsx, .xls",
        multiple:false,
        maxCount:1,
        customRequest: ({ file, onSuccess }) => {
            onSuccess('ok');
        },
        onChange: async (info) => {
            const { status } = info.file;
            if (status === 'done') {
                await handleFileUpload(info.file);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }

    return (
        <>
            <Form
                id="myForm"
                layout="vertical"
                onFinish={handleSubmit}
                onFinishFailed={handleSubmitFailed}
            >
                <Form.Item
                    name="batch_supplier_data"
                    getValueFromEvent= {(e) => e && e.fileList}
                    valuePropName="fileList"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your File'
                        },
                    ]}
                    noStyle
                >
                    <Upload.Dragger {...UploadConfig}>
                        <p className="ant-upload-drag-icon"><InboxOutlined/></p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single upload</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form>
        </>
    );
};

export default SupplierFormBatch;