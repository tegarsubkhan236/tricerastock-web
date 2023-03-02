import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import postsReducer from "../features/posts/postSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        posts: postsReducer
    },
    middleware: [
        thunk
    ]
})