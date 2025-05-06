import React from 'react';
import {Route, Routes} from 'react-router';
import WorkHubLayout from '../components/WorkHubLayout';
import Orders from './Orders';
import ManageMenu from './ManageMenu';
import ManageUsers from './ManageUsers';
import ContactMessages from './ContactMessages';
import ManageReservations from './ManageReservations.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const WorkHub = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkHubLayout />}>
        <Route
          path="manage-menu"
          element={
            <ProtectedRoute roles={['admin']}>
              <ManageMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute roles={['admin', 'employee']}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute roles={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="reservations"
          element={
            <ProtectedRoute roles={['admin', 'employee']}>
              <ManageReservations />
            </ProtectedRoute>
          }
        />
        <Route
          path="contact-messages"
          element={
            <ProtectedRoute roles={['admin', 'employee']}>
              <ContactMessages />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default WorkHub;
