import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
import PageNotFound from '../pages/PageNotFound';

const DataUpload = lazy(() => import('../pages/DataUpload'));
const Univariate = lazy(() => import('../pages/Univariate'));
const Outlier = lazy(() => import('../pages/Outlier'));
const MissingValue = lazy(() => import('../pages/MissingValue'));
const Bivariate = lazy(() => import('../pages/Bivariate'));
const Report = lazy(() => import('../pages/Report'));
const ProtectedRoutes = ({ isLoggedIn }) => (isLoggedIn ? (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="dataupload" />} />
        <Route path="dataupload" element={<DataUpload />} />
        <Route path="univariate" element={<Univariate />} />
        <Route path="outlier" element={<Outlier />} />
        <Route path="missingValue" element={<MissingValue />} />
        <Route path="bivariate" element={<Bivariate />} />
        <Route path="report" element={<Report />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  ));

  ProtectedRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };
export default ProtectedRoutes;
