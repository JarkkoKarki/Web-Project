import { useTranslation } from 'react-i18next';

import React from 'react'

export const UserInformation = () => {
  const {t} = useTranslation();
  return (
    <div className='flex flex-col items-start space-y-4 w-1/3 h-full'>
        <h3 className='self-start font-bold text-2xl mb-8'>{t("profilePage.user-information")}</h3>
          <p className='text-xl bg-[#101211] rounded border-[#000000] p-2'>{t("profilePage.name")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.username")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.email")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.address")}</p>
          <p className='text-xl bg-[#101211] rounded border-[#101211] p-2'>{t("profilePage.phone-number")}</p>
        </div>
  )
}

export default UserInformation

