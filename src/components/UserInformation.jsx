import React from 'react';
import { useTranslation } from 'react-i18next';

export const UserInformation = () => {
  const { t } = useTranslation();

  const clickHandler = (field) => {
    console.log(`${field} clicked`);
  };


  const profileInfo = [
    { label: t('profilePage.name'), value: 'John Doe' },
    { label: t('profilePage.username'), value: 'Johnny' },
    { label: t('profilePage.email'), value: 'Johnny@test.com' },
    { label: t('profilePage.address'), value: 'gloverstreet203' },
    { label: t('profilePage.phone-number'), value: '0443452340' },
  ];

  return (
    <div className='flex flex-col items-start space-y-4 w-1/3 h-full'>
      <h3 className='self-start font-bold text-2xl mb-8'>{t('profilePage.user-information')}</h3>
      {profileInfo.map((info, index) => (
        <div
          key={index}
          className='w-full text-xl bg-[#101211] rounded border-[#000000] p-2 cursor-pointer hover:bg-[#1c1e24] hover:border-[#000000] border-2 flex justify-between'
          onClick={() => clickHandler(info.label)}
        >
          <span>{info.label}</span>
          <span className='flex items-center space-x-2'>
            <span>{info.value}</span>
            <span className='font-bold'>{">"}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserInformation;

