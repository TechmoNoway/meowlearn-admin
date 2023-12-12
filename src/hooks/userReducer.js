// // const userReducer = (state = {}, action) => {
// //     switch (action.type) {
// //         case 'UPDATE_USER':
// //             return action.payload;
// //         default:
// //             return state;
// //     }
// // };

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const updateUser = async (updatedData) => {
//     const response = await axios.put('http://localhost:8870/api/user/updateUser', updatedData);

//     return response;
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState: {},
//     extraReducers: {
//         [updateUser.fulfilled]: (state, action) => action.payload,
//     },
// });

// export default userSlice.reducer;
