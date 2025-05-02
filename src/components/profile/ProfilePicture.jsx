import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useUserContext} from '../hooks/contextHooks';
import {useUpdateUser} from '../hooks/apiHooks';
import SaveCancelButtons from '../SaveCancelButtons';
import {rootUrl} from '../../utils/variables';

export const ProfilePicture = () => {
  const {t} = useTranslation();
  const {user, updateUser} = useUserContext();
  const {updateProfilePicture} = useUpdateUser();
  const [avatar, setAvatar] = useState(rootUrl + user?.filename);
  const fileUploadRef = useRef();
  const [showButtons, setShowButtons] = useState(false);

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
    setShowButtons(true);
  };

  const saveImg = async () => {
    const uploadedFile = fileUploadRef.current.files[0];
    if (!uploadedFile || !user.id) {
      return;
    }

    try {
      const response = await updateProfilePicture(uploadedFile, user.id, user);
      console.log('response:', response);

      if (response) {
        console.log(user);
        updateUser({
          ...user,
          filename: response.filename,
        });
        setAvatar(rootUrl + response.filename);
        fileUploadRef.current.value = null;
        setShowButtons(false);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
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

  const cancelImgUpload = () => {
    setAvatar(avatar);
    fileUploadRef.current.value = null;
    setShowButtons(false);
  };

  return (
    <div className="flex h-full flex-col items-center space-y-4">
      <h3 className="mb-8 text-center text-2xl font-bold">
        {t('profilePage.profile-picture')}
      </h3>
      <img
        src={avatar || rootUrl + user?.filename}
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
        {showButtons && (
          <SaveCancelButtons onSave={saveImg} onCancel={cancelImgUpload} />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
