import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {detailProduct} from "./msProductSlice";

const MsProductFormDetailPrice = () => {
    const dispatch = useDispatch()
    const {productSelectedRow} = useSelector(state => state.products)

    useEffect(() => {
        try {
            dispatch(detailProduct({id: productSelectedRow[0], based_on: "price"})).unwrap().then((res) => {
                console.log(res)
            })
        } catch (e) {
            console.log(e)
        }
    }, [])


    return (
        <div>
            <h1>Hallo InvProductFormPriceHistory</h1>
        </div>
    );
};

export default MsProductFormDetailPrice;