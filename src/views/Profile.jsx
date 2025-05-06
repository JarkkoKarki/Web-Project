import {useTranslation} from 'react-i18next';
import ProfilePicture from '../components/profile/ProfilePicture';
import UserInformation from '../components/profile/UserInformation';
import DeleteUserButton from '../components/profile/DeleteUserButton';
import {OrderHistory} from '../components/orders/OrderHistory';
import {useUserContext} from '../components/hooks/contextHooks';
import {Link, useLocation} from 'react-router';
import Reservations from '../components/reservation/Reservations';
import {useEffect, useState} from 'react';

const Profile = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (location.state?.activeTab) {
      console.log('location:', location.state);
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0f0e] font-sans text-white">
      <h2 className="mt-10 mb-12 text-3xl font-bold">
        {t('profilePage.profile')}
      </h2>

      <section className="flex h-auto w-full flex-col items-center justify-center space-y-6 px-6 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-20">
        <ProfilePicture />
        <UserInformation />
      </section>
      <section className="mt-30 mb-10 flex w-full items-center justify-center space-x-4">
        <button
          onClick={() => setActiveTab('orders')}
          className={`rounded px-6 py-2 ${
            activeTab === 'orders'
              ? 'bg-yellow-500 font-bold text-black'
              : 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black'
          }`}
        >
          {t('profilePage.order-history') || 'Order History'}
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`rounded px-6 py-2 ${
            activeTab === 'reservations'
              ? 'bg-yellow-500 font-bold text-black'
              : 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black'
          }`}
        >
          {t('profilePage.reservations') || 'Reservations'}
        </button>
      </section>
      <section className="flex w-full items-center justify-center px-6">
        <div className="flex flex-col">
          {activeTab === 'orders' ? <OrderHistory /> : <Reservations />}
        </div>
      </section>

      <section className="mt-10 flex h-auto w-full flex-row items-center justify-center space-x-5 px-20 py-10 md:items-end md:justify-end">
        <Link
          to="/logout"
          className="mt-6 inline-block cursor-pointer border border-red-400 px-6 py-2 text-red-400 transition hover:bg-red-400 hover:text-black"
        >
          {t('header.sign-out')}
        </Link>
        <DeleteUserButton userId={user.id} />
      </section>
    </div>
  );
};

export default Profile;
