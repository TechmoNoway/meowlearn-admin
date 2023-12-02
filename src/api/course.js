import axios from 'axios';

// const API = axios.create({ baseURL: 'http://26.127.65.83:8871/api' });

const API = axios.create({ baseURL: 'http://localhost:8871/api' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
    return req;
});

export const getCourseByTitle = (title) => API.get(`/course/getCourse/${title}`);
export const getAllCourses = () => API.get('/course/getallcourses');
export const insertCourse = (formValue) => API.post('/course/insertcourses', formValue);
