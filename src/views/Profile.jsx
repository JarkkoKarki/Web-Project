import {useTranslation} from 'react-i18next';
import ProfilePicture from '../components/profile/ProfilePicture';
import UserInformation from '../components/profile/UserInformation';
import DeleteUserButton from '../components/profile/DeleteUserButton';
import {OrderHistory} from '../components/orders/OrderHistory';
import {useUserContext} from '../components/hooks/contextHooks';

const Profile = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d0f0e] font-sans text-white">
      <h2 className="mb-12 text-3xl font-bold">{t('profilePage.profile')}</h2>
      <section className="flex h-[500px] w-full flex-row items-center justify-center space-x-20 px-6">
        <ProfilePicture />
        <UserInformation />
      </section>
      <section className="flex w-full flex-row items-center justify-center space-y-10 px-6">
        <OrderHistory />
      </section>
      <section className="mt-10 flex h-auto w-full flex-row items-center justify-center space-x-20 px-6">
        <DeleteUserButton userId={user.id} />
      </section>
    </div>
  );
};

export default Profile;
