import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/axios";

export const postSalesOrder = createAsyncThunk(
    'sales_order/post',
    async ({postData}, thunkAPI) => {
        try {
            const response = await instance.post('/v1/transaction/sales_order/', postData);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

const salesOrderSlice = createSlice({
    name: "sales_orders",
    initialState: {
        salesOrderStatus : "idle",
        salesOrderResult : null,
    },
    reducers: {
        setSalesOrderStatus: (state, action) => {
            state.salesOrderStatus = action.payload
        },
        setSalesOrderResult: (state, action) => {
            state.salesOrderResult = action.payload
        }
    },
    extraReducers: {
        [postSalesOrder.pending] : (state) => {
            state.salesOrderStatus = "pending"
        },
        [postSalesOrder.fulfilled] : (state) => {
            state.salesOrderStatus = "succeeded"
        },
        [postSalesOrder.rejected] : (state) => {
            state.salesOrderStatus = "failed"
        }
    }
})

export const {
    setSalesOrderStatus,
    setSalesOrderResult
} = salesOrderSlice.actions;

export default salesOrderSlice.reducer;