// import { configureStore } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// import userReducer from '../hooks/userReducer';

// const { data: userListResponse } = await axios.get(`http://localhost:8870/api/user/getallusers`);

// const result = userListResponse.data.find((obj) => obj.username === jwtDecode(localStorage.getItem('token')).sub);

// const initialState = {
//     user: { ...result },
// };

// export default configureStore({
//     reducer: {
//         user: userReducer,
//     },
//     preloadedState: initialState,
// });
