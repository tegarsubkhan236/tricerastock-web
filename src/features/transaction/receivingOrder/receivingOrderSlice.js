import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/lib/axios";

export const postRo = createAsyncThunk(
    'ro/post',
    async ({postData}, thunkAPI) => {
        try {
            const response = await instance.post('/v1/transaction/receiving_order/', postData);
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

const receivingOrderSlice = createSlice({
    name: "receiving_orders",
    initialState: {
        roStatus : "idle",
    },
    reducers: {},
    extraReducers: {
        [postRo.pending] : (state) => {
            state.roStatus = "pending"
        },
        [postRo.fulfilled] : (state) => {
            state.roStatus = "succeeded"
        },
        [postRo.rejected] : (state) => {
            state.roStatus = "failed"
        }
    }
})

export default receivingOrderSlice.reducer;