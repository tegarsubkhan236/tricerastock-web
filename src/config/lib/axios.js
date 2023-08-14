import axios from "axios";
import {logout} from "../../features/core/coreAuth/coreAuthSlice";
import {getStore} from "../helper/storeInjector";

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = getStore().getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            getStore().dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default instance