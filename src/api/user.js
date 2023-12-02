import axios from 'axios';

// const API = axios.create({ baseURL: 'http://26.127.65.83:8870/api' });

const API = axios.create({ baseURL: 'http://localhost:8870/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
    return req;
});

// Authentication
export const login = (formValue) => API.post('/user/checklogin', formValue);
export const getUser = () => API.get('/user/getUser');
export const updateUserApi = (formValue) => API.put('/user/updateUser', formValue);
export const getAllUsers = () => API.get('/user/getallusers');
