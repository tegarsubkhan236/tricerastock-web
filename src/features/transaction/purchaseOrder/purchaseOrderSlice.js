import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/lib/axios";

export const fetchPo = createAsyncThunk(
    'po/fetch',
    async ({page, perPage}, thunkAPI) => {
        try {
            const response = await instance.get('/v1/transaction/purchase_order', {
                params: {
                    page: page,
                    limit: perPage,
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const fetchDetailPo = createAsyncThunk(
    'po/detail',
    async ({po_id, po_code, bo_id, bo_code}, thunkAPI) => {
        try {
            const response = await instance.get(`/v1/transaction/purchase_order/detail`, {
                params: {
                    po_id : po_id,
                    po_code : po_code,
                    bo_id : bo_id,
                    bo_code : bo_code,
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const postPo = createAsyncThunk(
    'po/post',
    async ({postData}, thunkAPI) => {
        try {
            const response = await instance.post('/v1/transaction/purchase_order/', postData);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

const purchaseOrderSlice = createSlice({
    name: "purchase_orders",
    initialState: {
        poData: [],
        poTotalData: 0,
        poStatus: 'idle',
        poCurrentPage: 1,
        poPerPage: 5
    },
    reducers: {
        setPoPerPage: (state, action) => {
            state.poStatus = "idle";
            state.poPerPage = action.payload;
        },
        setPoCurrentPage: (state, action) => {
            state.poStatus = "idle";
            state.poCurrentPage = action.payload;
        },
    },
    extraReducers: {
        [fetchPo.pending]: (state) => {
            state.poStatus = 'loading';
        },
        [fetchPo.fulfilled]: (state, action) => {
            state.poStatus = 'succeeded';
            state.poData = action.payload.data.results?.map((purchase_order) => ({
                key: purchase_order.id,
                id: purchase_order.id,
                po_code: purchase_order.po_code,
                status: purchase_order.status,
                supplier_name: purchase_order.supplier_name,
                disc: purchase_order.disc,
                tax: purchase_order.tax,
                amount: purchase_order.amount,
                remarks: purchase_order.remarks,
                purchase_order_products: purchase_order.purchase_order_products.map((purchase_order_product) => ({
                    product_id: purchase_order_product.product_id,
                    product_name: purchase_order_product.product_name,
                    quantity: purchase_order_product.quantity,
                    price: purchase_order_product.price,
                })),
                back_orders: purchase_order.back_orders ? purchase_order.back_orders.map((back_order) => ({
                    key: back_order.id,
                    id: back_order.id,
                    bo_code: back_order.bo_code,
                    status: back_order.status,
                    disc: back_order.disc,
                    tax: back_order.tax,
                    amount: back_order.amount,
                    remarks: back_order.remarks,
                    back_order_products: back_order.back_order_products.map((back_order_product) => ({
                        product_id: back_order_product.product_id,
                        product_name: back_order_product.product_name,
                        quantity: back_order_product.quantity,
                        price: back_order_product.price,
                    })),
                })) : []
            }));
            state.poTotalData = action.payload.data.total;
        },
        [fetchPo.rejected]: (state) => {
            state.poStatus = 'failed';
        },
    }
})

export const {
    setPoPerPage,
    setPoCurrentPage,
} = purchaseOrderSlice.actions

export default purchaseOrderSlice.reducer;