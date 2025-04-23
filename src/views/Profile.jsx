import React from 'react'
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const {t} = useTranslation();
  return (
    <div className='flex flex-col items-center justify-center bg-[#0d0f0e] text-white font-sans'>
      <h2 className='mb-12 text-3xl font-bold'>Profile</h2>
      <section className='flex flex-row items-center justify-center space-x-20 px-6 max-w-6xl h-[400px]'>
        <div className='flex flex-col items-center space-y-4 h-full'>
          <h3 className=' text-center font-bold text-2xl mb-8'>{t("profilePage.profile-picture")}</h3>
        <img src="https://placehold.co/370x250" alt="Profile" className='object-cover rounded-lg shadow-lg p-2' />
        <div className='flex flex-row items-center justify-center space-x-4'>
        <button className='"mt-6 px-6 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition inline-block cursor-pointer'>
        {t("profilePage.view")}</button>
        <button className='"mt-6 px-6 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition inline-block cursor-pointer'>
        {t("profilePage.change")}</button>
        </div>
        </div>
        <div className='flex flex-col items-start space-y-4 w-1/3 h-full'>
        <h3 className='self-start font-bold text-2xl mb-8'>{t("profilePage.user-information")}</h3>
          <p className='text-xl bg-[#101211] rounded border-[#000000] p-2'>{t("profilePage.name")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.username")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.email")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.address")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.phone-number")}</p>
        </div>
      </section>
      </div>
  )
}

export default Profile
