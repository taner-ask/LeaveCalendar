import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/dataReducer';
import authReducer from './reducers/authReducer';


const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
  },
});

export default store;
