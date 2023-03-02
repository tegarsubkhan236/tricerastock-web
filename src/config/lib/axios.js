import axios from "axios";
// import {logout} from "../../features/auth/authSlice";
// import {store} from "../../app/store";

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log(error)
            // store.dispatch(logout())
            // history.push('/login');
        }
        return Promise.reject(error)
    }
)

export default instance