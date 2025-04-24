import React from 'react'
import { useTranslation } from 'react-i18next';

export const ProfilePicture = () => {
  const {t} = useTranslation();
  const handleClick = () => {
    console.log("Button clicked")
  }

  return (
    <div className='flex flex-col items-center space-y-4 h-full'>
      <h3 className=' text-center font-bold text-2xl mb-8'>{t("profilePage.profile-picture")}</h3>
      <img src="https://placehold.co/370x250" alt="Profile" className='object-cover rounded-lg shadow-lg p-2' />
      <div className='flex flex-row items-center justify-center space-x-4'>
        <button onClick={handleClick} className='"mt-6 px-6 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition inline-block cursor-pointer'>
        {t("profilePage.view")}</button>
        <button onClick={handleClick} className='"mt-6 px-6 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition inline-block cursor-pointer'>
        {t("profilePage.change")}</button>
      </div>
    </div>
  )
}

export default ProfilePicture
