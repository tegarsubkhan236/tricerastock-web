import React, {useState} from 'react';
import {InboxOutlined} from "@ant-design/icons";
import {Form, message, Upload} from "antd";
import {importExcel} from "../../config/lib/importExcel";
import {useDispatch} from "react-redux";
import {postSupplier, setSupplierModalVisible, setSupplierStatus} from "./invSupplierSlice";

const InvSupplierFormBatch = ({form}) => {
    const dispatch = useDispatch()
    const [batchData, setBatchData] = useState([])

    const handleSubmit = () => {
        form.validateFields().then(async () => {
            try {
                if (batchData.length <= 0) {
                    return message.error("Please input data")
                }
                await dispatch(postSupplier({postData: batchData})).unwrap()
                await dispatch(setSupplierStatus("idle"))
                await dispatch(setSupplierModalVisible(false))
                return message.success('Excel file uploaded successfully.');
            } catch (e) {
                console.log("handleSubmit error", e)
            }
        })
    }

    const handleFileUpload = async (file) => {
        try {
            const data = await importExcel(file)
            const updatedData = data.map((obj) => ({
                name: obj[1],
                address: obj[2],
                contact_person: obj[3],
                contact_number: obj[4]
            }));
            setBatchData(updatedData)
        } catch (error) {
            console.log("handleFileUpload")
            console.log(error)
        }
    };

    const UploadConfig = {
        name:"supplier_file",
        multiple:false,
        maxCount:1,
        customRequest: ({ file, onSuccess }) => {
            setTimeout(() => {
                onSuccess('ok');
            }, 0);
        },
        onChange: (info) => {
            const { status } = info.file;
            if (status === 'done') {
                handleFileUpload(info.file);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    }

    return (
        <Form id="myForm"
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              onFinishFailed={(e) => console.log(e)}
        >
            <Form.Item name="batch_Supplier_data"
                       rules={[{required: true, message: 'Please input your File'}]}
                       label="Batch Supplier Data"
            >
                <Upload.Dragger {...UploadConfig}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Upload.Dragger>
            </Form.Item>
        </Form>
    );
};

export default InvSupplierFormBatch;