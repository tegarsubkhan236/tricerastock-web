import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({page, perPage}) => {
        const response = await instance.get('/user', {
            params: {
                page: page,
                limit: perPage,
            }
        });
        return response.data;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        perPage: 10
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const {setCurrentPage} = usersSlice.actions;

export default usersSlice.reducer;