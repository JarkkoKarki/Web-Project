import React from 'react';
import {Link, Navigate, Outlet} from 'react-router';
import {useTranslation} from 'react-i18next';

const WorkHubLayout = () => {
  const {t} = useTranslation();

  return (
    <div className="flex bg-[#0d0f0e] text-white font-sans">
      <aside className="bg-[#0d0f0e] text-white w-64 min-h-screen border-r border-gray-800 flex flex-col items-center gap-4">
        <h1 className="border border-yellow-500 px-10 p-2 text-xl font-bold text-white">{t('header.workhub')}</h1>
        <nav>
          <ul className="flex flex-col items-center gap-4 text-sm text-white tracking-wider underline underline-offset-4">
            <li>
              <Link to="manage-menu" className="hover:text-yellow-500">
                Manage Menu
              </Link>
            </li>
            <li>
              <Link to="orders" className="hover:text-yellow-500">
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default WorkHubLayout;
