import axios from 'axios';

const API = axios.create({ baseURL: 'https://user-backend-meolearn.onrender.com/api' });

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
