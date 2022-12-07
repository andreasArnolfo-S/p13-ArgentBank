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
     token: null,
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
                    return res.data.body.token;
               })
               return data;
          } catch (err) {
               return rejectWithValue(err);
          }
     }
);

export const profileUser = createAsyncThunk(
     'user/profileUser',
     async (token: string, { rejectWithValue }) => {   
          try {
               const data = await axios.post(`${URL}/profile`, {} ,{
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${token}`
                    }
               }).then((res) => {
                    return res.data.body;
               })
               return data;
          } catch (err) {
               return rejectWithValue(err);
          }
     }
);

export const updateUser = createAsyncThunk(
     'user/updateUser',
     async (user:{firstName: string, lastName: string, token: string}, { rejectWithValue } ) => {
          try {
               const data = await axios.put(`${URL}/profile`, {
                    firstName: user.firstName,
                    lastName: user.lastName
               }, {
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: `Bearer ${user.token}`
                    }
               }).then((res) => {
                    return res.data.body;
               })
               return data;
          } catch (err) {
               return rejectWithValue(err);
          }
     }
);

export const logoutUser = () => {
     return { type: 'user/logoutUser' }
}

    

const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
          logoutUser: (state, action) => {
               return initialState;
          }
     },
     extraReducers: (builder) => {
          /* A reducer that is being added to the userSlice.reducer. */
          builder.addCase(loginUser.pending, (state, action) => {
               return { ...state, status: 'loading' }
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {               
               return { ...state, status: 'success', token: action.payload}
          });
          builder.addCase(loginUser.rejected, (state, action) => {
               return { ...state, status: 'failed' }
          });
          builder.addCase(profileUser.pending, (state, action) => {
               return { ...state }
          });
          builder.addCase(profileUser.fulfilled, (state, action) => {
               return { ...state, user: action.payload, connected: true }
          });
          builder.addCase(profileUser.rejected, (state, action) => {
               return { ...state }
          });
          builder.addCase(updateUser.pending, (state, action) => {
               return { ...state }
          });
          builder.addCase(updateUser.fulfilled, (state, action) => {
               return { ...state, user: action.payload }
          });
          builder.addCase(updateUser.rejected, (state, action) => {
               return { ...state }
          });
     },
});
export default userSlice.reducer;