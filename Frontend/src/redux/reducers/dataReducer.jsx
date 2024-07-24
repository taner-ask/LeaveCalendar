import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';


const initialState = {
  leaves : [],
  globalStartDate: null,
  globalEndDate: null,
  globalTotalLeaveDays : 0,
};

 const BASE_URL = "/leaves"

export const getLeavesByUserId = createAsyncThunk(
  'leaves/getByUserId',
  async (userId) => {
    const response = await axiosInstance.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  }
);

export const saveGlobalData = createAsyncThunk(
  'data/saveGlobalData',
  async (data) => {
    try {
      const response = await axiosInstance.post('/leaves', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    saveData: (state, action) => {
      state.globalStartDate = action.payload.startDate;
      state.globalEndDate = action.payload.endDate;
      state.globalTotalLeaveDays = action.payload.totalLeaveDays;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeavesByUserId.fulfilled, (state, action) => {
        state.leaves = action.payload;
      })
      .addCase(saveGlobalData.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
      })
      .addCase(saveGlobalData.rejected, (state, action) => {
        console.error('Error saving global data:', action.error.message);
      });
  },
});

export const { saveData } = dataSlice.actions;
export default dataSlice.reducer;
