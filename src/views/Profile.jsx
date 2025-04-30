import {useTranslation} from 'react-i18next';
import ProfilePicture from '../components/ProfilePicture';
import UserInformation from '../components/UserInformation';
import DeleteUserButton from '../components/DeleteUserButton';

const Profile = () => {
  const {t} = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center bg-[#0d0f0e] font-sans text-white">
      <h2 className="mb-12 text-3xl font-bold">{t('profilePage.profile')}</h2>
      <section className="flex h-[500px] w-full flex-row items-center justify-center space-x-20 px-6">
        <ProfilePicture />
        <UserInformation />
      </section>
    </div>
  );
};

export default Profile;
