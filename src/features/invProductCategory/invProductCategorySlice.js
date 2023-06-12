import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../config/lib/axios";

export const fetchProductCategory = createAsyncThunk(
    'productCategory/fetch',
    async ({page, perPage}, thunkAPI) => {
        try {
            const response = await instance.get('/product_category', {
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

export const postProductCategory = createAsyncThunk(
    'productCategory/post',
    async ({parent_id, name}, thunkAPI) => {
        try {
            const response = await instance.post('/product_category', {
                parent_id, name
            });
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
)

export const updateProductCategory = createAsyncThunk(
    'productCategory/update',
    async ({id, name}, thunkAPI) => {
        try {
            const response = await instance.put(`/product_category/${id}`, {
                name
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

export const deleteProductCategory = createAsyncThunk(
    'productCategory/delete',
    async ({id}, thunkAPI) => {
        try {
            await instance.delete(`/product_category/${id}`, id);
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
);

const msInvProductCategory = createSlice({
    name: 'product_categories',
    initialState: {
        treeData: [],
        totalData: 0,
        status: 'idle',
        currentPage: 1,
        perPage: 5
    },
    reducers: {
        setPerPage: (state, action) => {
            state.status = 'idle';
            state.perPage = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.status = 'idle';
            state.currentPage = action.payload;
        },
    },
    extraReducers: {
            [fetchProductCategory.pending]: (state) => {
                state.status = 'loading';
            },
            [fetchProductCategory.fulfilled]: (state, action) => {
                state.status = 'succeeded';
                state.totalData = action.payload.data.total;
                state.treeData = action.payload.data.results.map((item) => ({
                    key: item.id,
                    value: item.id,
                    id: item.id,
                    name: item.name,
                    parent_id: item.parent_id,
                    title: item.name,
                    children: item.children?.length && item.children?.map((firstChild) => ({
                        key: firstChild.id,
                        value: firstChild.id,
                        id: firstChild.id,
                        name: firstChild.name,
                        parent_id: firstChild.parent_id,
                        title: firstChild.name,
                        children: firstChild.children?.length && firstChild.children?.map((secondChild) => ({
                            key: secondChild.id,
                            value: secondChild.id,
                            id: secondChild.id,
                            name: secondChild.name,
                            parent_id: secondChild.parent_id,
                            title: secondChild.name,
                        })),
                    })),
                }));
            },
            [postProductCategory.pending]: (state) => {
                state.status = 'loading';
            },
            [updateProductCategory.pending]: (state) => {
                state.status = 'loading';
            },
    },
});

export const {setCurrentPage, setPerPage} = msInvProductCategory.actions;

export default msInvProductCategory.reducer;