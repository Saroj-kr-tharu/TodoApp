import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from '../redux/slice/authenticationSlice';
import TodoReducer from '../redux/slice/todoapiSlice';

const store = configureStore({
    reducer: {
        authenticationReducer,
        TodoReducer,
    }
});


export default store;