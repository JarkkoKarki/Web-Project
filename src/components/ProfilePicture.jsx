import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
// import {useUpdateUser} from './hooks/apiHooks';
import DefaultImage from '../assets/images/default-avatar.jpg';

export const ProfilePicture = () => {
  const {t} = useTranslation();
  // const updateUserApi = useUpdateUser();
  const [avatar, setAvatar] = useState(DefaultImage);
  const fileUploadRef = useRef();

  const handleImgUpload = async (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImgDisplay = () => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(uploadedFile);
    if (!uploadedFile) {
      return;
    }
    setAvatar(cachedURL);
  };

  const saveImg = async () => {
    // TODO: implement save image functionality
    console.log('img', fileUploadRef.current.files[0]);
  };

  // Subject to change(?)
  const viewImg = () => {
    const uploadedFile = fileUploadRef.current.files[0];
    if (!uploadedFile) {
      return;
    }
    const cachedURL = URL.createObjectURL(uploadedFile);
    window.open(cachedURL, '_blank');
  };

  return (
    <div className="flex h-full flex-col items-center space-y-4">
      <h3 className="mb-8 text-center text-2xl font-bold">
        {t('profilePage.profile-picture')}
      </h3>
      <img
        src={avatar}
        alt="Profile"
        className="h-[300px] w-[300px] rounded-lg object-cover p-2 shadow-lg"
      />
      <div className="flex flex-row items-center justify-center space-x-4">
        <button
          type="button"
          onClick={viewImg}
          className='"mt-6 inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black'
        >
          {t('profilePage.view')}
        </button>
        <form encType="multipart/form-data">
          <button
            onClick={handleImgUpload}
            type="submit"
            className='"mt-6 inline-block cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black'
          >
            {t('profilePage.change')}
          </button>
          <input
            title="file"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            ref={fileUploadRef}
            onChange={uploadImgDisplay}
            hidden
          />
        </form>
      </div>
      <div>
        {avatar !== DefaultImage && (
          <button
            type="button"
            onClick={saveImg}
            className="mt-6 cursor-pointer border border-yellow-500 px-6 py-2 text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            {t('profilePage.save-img')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
