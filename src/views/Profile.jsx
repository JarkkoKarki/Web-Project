import React from 'react'
import { useTranslation } from 'react-i18next';
import ProfilePicture from '../components/ProfilePicture';
import UserInformation from '../components/UserInformation';

const Profile = () => {
  const {t} = useTranslation();
  return (
    <div className='flex flex-col items-center justify-center bg-[#0d0f0e] text-white font-sans'>
      <h2 className='mb-12 text-3xl font-bold'>{t("profilePage.profile")}</h2>
      <section className='flex flex-row items-center justify-center space-x-20 px-6 w-full h-[500px]'>
      <ProfilePicture />
      <UserInformation />
      </section>
      <section>
        <button className='mt-6 px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition inline-block cursor-pointer'>
        {t("profilePage.delete-user")}</button>
      </section>
    </div>
  )
}

export default Profile
