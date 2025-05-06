import React from 'react';
import {Link, Outlet} from 'react-router';
import {useTranslation} from 'react-i18next';

const WorkHubLayout = () => {
  const {t} = useTranslation();

  return (
    <div className="flex bg-[#0d0f0e] font-sans text-white">
      <aside className="flex min-h-screen w-64 flex-col items-center gap-4 border-r border-gray-800 bg-[#0d0f0e] text-white">
        <h1 className="border border-yellow-500 p-2 px-10 text-xl font-bold text-white">
          {t('workhubHeader.workhub')}
        </h1>
        <nav>
          <ul className="flex flex-col items-center gap-4 text-sm tracking-wider text-white underline underline-offset-4">
            <li>
              <Link to="manage-menu" className="hover:text-yellow-500">
                {t('workhubHeader.manage-menu')}
              </Link>
            </li>
            <li>
              <Link to="orders" className="hover:text-yellow-500">
                {t('workhubHeader.orders')}
              </Link>
            </li>
            <li>
              <Link to="contact-messages" className="hover:text-yellow-500">
                Contact Messages
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default WorkHubLayout;
