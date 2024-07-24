import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: 'idle',
    userId: null,
    userName: '',
    token: localStorage.getItem('token') || null,
    error: null,
  };

export const loginRequest = createAsyncThunk('auth/login', async ({ username, password }) => {
    try {
        const response = await axios.post('http://localhost:8080/api/login', { username, password });
        console.log(response)
        console.log(response.data)
        if (response.data && response.data.token) {
            return response.data ;
        } else {
            throw new Error('Error occurred during login');
        }
    } catch (error) {
        throw new Error('Invalid username or password');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginRequest.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginRequest.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userId = action.payload.userId;
                state.userName = action.payload.userName;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token); 
                state.error = null;
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
