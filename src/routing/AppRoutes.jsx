import React from 'react';
import { useSelector } from 'react-redux';
import {
 Route, Routes, BrowserRouter,
} from 'react-router-dom';
import Login from '../pages/Login';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.app.auth.isLoggedIn);
  return (
    <BrowserRouter>
      <React.Suspense fallback={<h5>Loading....</h5>}>
        <Routes>
          <Route path="/*" element={<ProtectedRoutes isLoggedIn={isLoggedIn} />} />
          <Route index path="login" element={<Login />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
export default AppRoutes;
