import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../../config/axios";
import jwtDecode from "jwt-decode";

export const postLogin = createAsyncThunk(
    'auth/postLogin',
    async ({identity, password}, thunkAPI) => {
        try {
            const response = await instance.post('/v1/auth/login', {
                identity, password
            });
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: {
            [postLogin.pending]: (state) => {
                state.isLoading = true;
                state.error = null;
            },
            [postLogin.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user = decodeToken(action.payload.data);
                state.token = action.payload.data;
            },
            [postLogin.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            },
    },
})

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error(`Error decoding token: ${error.message}`);
        return null;
    }
};
export const {logout} = authSlice.actions;

export default authSlice.reducer