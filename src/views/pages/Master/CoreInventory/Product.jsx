import React from 'react';
import {Form} from "antd";
import ProductTable from "../../../../features/master/product/ProductTable";
import ProductForm from "../../../../features/master/product/ProductForm";

const Product = () => {
    const [form] = Form.useForm();

    return (
        <>
            <ProductTable form={form}/>
            <ProductForm form={form}/>
        </>
    );
};

export default Product;