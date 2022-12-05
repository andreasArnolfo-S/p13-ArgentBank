import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = "http://localhost:3001/api/v1/user";

const initialState = {
     connected: false,
     status: 'void',
     loaded: false,
     user: {
          firstName: '',
          lastName: ''
     },
     token: localStorage.getItem('token'),
     error: null
};

export const loginUser = createAsyncThunk(
     'user/loginUser',
     async (user: { email: string, password: string }, { rejectWithValue }) => {
          try {
               const data = await axios.post(`${URL}/login`, {
                    email: user.email,
                    password: user.password
               }).then((res) => {
                    console.log(res.data);
                    return res.data.body.token;
               })
               localStorage.setItem('token', data);
          } catch (err) {
               return rejectWithValue(err);
          }
     }
);

export const profileUser = createAsyncThunk(
     'user/profileUser',
     async () => {   
          const token = localStorage.getItem('token');
          console.log(token);
          
          try {
               const data = await axios.post(`${URL}/profile`, {} ,{
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${token}`
                    }
               }).then((res) => {
                    console.log(res.data);
                    return res.data.body;
               })
               return data;
          } catch (err) {
               return console.log(err);
          }
     }
);

     

const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {

     },
     extraReducers: (builder) => {
          /* A reducer that is being added to the userSlice.reducer. */
          builder.addCase(loginUser.pending, (state, action) => {
               return { ...state, status: 'loading' }
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
               return { ...state, status: 'success' }
          });
          builder.addCase(loginUser.rejected, (state, action) => {
               return { ...state, status: 'failed' }
          });
          builder.addCase(profileUser.pending, (state, action) => {
               return { ...state }
          });
          builder.addCase(profileUser.fulfilled, (state, action) => {
               return { ...state, user: action.payload }
          });
          builder.addCase(profileUser.rejected, (state, action) => {
               return { ...state }
          });


     },
});
export default userSlice.reducer;