import React, {createContext, useState} from 'react';
import {Col, Row} from "antd";
import SupplierToolkit from "./SupplierToolkit";
import SupplierTable from "./SupplierTable";
import {useDispatch} from "react-redux";
import {setSupplierStatus} from "../supplierSlice";

export const SupplierTableContext = createContext()
const Index = () => {
    const dispatch = useDispatch();
    const [perPage, setPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRow, setSelectedRow] = useState([])
    const [filter, setFilter] = useState([])
    const [errorMessage, setErrorMessage] = useState([])
    const [successMessage, setSuccessMessage] = useState([])

    const handlePageSizeChange = (current, size) => {
        dispatch(setSupplierStatus("idle"))
        setPerPage(size)
    }

    const handlePageChange = (page) => {
        dispatch(setSupplierStatus("idle"))
        setCurrentPage(page)
    }

    const handleErrorMessage = (val) => {
        setErrorMessage(val)
        setSuccessMessage([])
    }

    const handleSuccessMessage = (val) => {
        setErrorMessage([])
        setSuccessMessage(val)
    }

    return (
        <SupplierTableContext.Provider value={{
            perPage,
            setPerPage,
            handlePageSizeChange,
            currentPage,
            setCurrentPage,
            handlePageChange,
            selectedRow,
            setSelectedRow,
            filter,
            setFilter,
            errorMessage,
            setErrorMessage,
            handleErrorMessage,
            successMessage,
            setSuccessMessage,
            handleSuccessMessage,
        }}>
            <Row>
                <Col span={24} style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px'}}>
                    <SupplierToolkit/>
                </Col>
                <Col span={24}>
                    <SupplierTable/>
                </Col>
            </Row>
        </SupplierTableContext.Provider>
    );
};

export default Index;