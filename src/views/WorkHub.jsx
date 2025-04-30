import React from 'react';
import {Route, Routes} from 'react-router';
import WorkHubLayout from '../components/WorkHubLayout';
import Orders from './Orders';
import ManageMenu from './ManageMenu';

const WorkHub = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkHubLayout />}>
        <Route path="manage-menu" element={<ManageMenu />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default WorkHub;
