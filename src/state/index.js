// https://github.com/reduxjs/cra-template-redux/tree/master/template/src
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';

 const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
export default store;
