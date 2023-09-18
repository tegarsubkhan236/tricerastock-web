import React, {useState} from 'react';
import {InboxOutlined} from "@ant-design/icons";
import {Form, message, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {postProduct, setProductModalVisible, setProductStatus} from "../productSlice";
import {importExcel} from "../../../../config/importExcel";

const ProductFormBatch = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth);
    const [batchData, setBatchData] = useState([])

    const handleSubmit = async () => {
        try {
            if (batchData.length <= 0) {
                return message.error("Please input data")
            }
            await dispatch(postProduct(batchData)).unwrap()
            await dispatch(setProductStatus("idle"))
            await dispatch(setProductModalVisible(false))
            return message.success('Excel file uploaded successfully.');
        } catch (e) {
            console.log("handleSubmit",e)
        }
    }

    const handleFileUpload = async (file) => {
        try {
            const data = await importExcel(file)
            const updatedData = data.map((obj) => ({
                name: obj[1],
                sell_price: obj[2],
                user_id: user.user_id,
                description: obj[1],
                product_categories_id: [{id : obj[3]}],
                supplier_id: obj[4],
            }));
            setBatchData(updatedData)
        } catch (error) {
            console.error("handleFileUpload error", error);
        }
    };

    const UploadConfig = {
        name:"file",
        multiple:false,
        showUploadList: false,
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
              layout="vertical"
              onFinish={handleSubmit}
              onFinishFailed={(e) => console.log(e)}
        >
            <Form.Item name="batch_product_data"
                       rules={[{required: true, message: 'Please input your File'}]}
                       valuePropName= 'fileList'
                       noStyle
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

export default ProductFormBatch;