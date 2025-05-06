import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import SaveCancelButtons from '../SaveCancelButtons';
import {useUserContext} from '../hooks/contextHooks';
import {useUpdateUser} from '../hooks/apiHooks';

export const PasswordUpdate = ({onSave, onCancel}) => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {putUser} = useUpdateUser();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const missingFields = Object.keys(passwords).filter(
      (key) => !passwords[key],
    );

    if (missingFields.length > 0) {
      setInvalidFields(missingFields); // Highlight missing fields
      alert(t('profilePage.all-fields-required'));
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswords((prev) => ({
        ...prev,
        newPassword: '',
        confirmPassword: '',
      }));
      setInvalidFields(['newPassword', 'confirmPassword']);
      alert(t('profilePage.passwords-do-not-match'));
      return;
    }

    try {
      // Send the complete user object with the new password to the backend
      const userData = {
        ...user,
        password: passwords.newPassword,
      };

      const response = await putUser(userData);

      // Save the token immediately after a successful update
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      }

      // Pass the response to the parent component's onSave handler
      onSave(userData);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const passwordFields = [
    {name: 'currentPassword', placeholder: t('profilePage.current-password')},
    {name: 'newPassword', placeholder: t('profilePage.new-password')},
    {name: 'confirmPassword', placeholder: t('profilePage.confirm-password')},
  ];

  return (
    <>
      <h2 className="mb-8 text-xl font-bold">
        {t('profilePage.change-password')}
      </h2>
      {passwordFields.map((field) => (
        <input
          key={field.name}
          type="password"
          value={passwords[field.name]}
          onChange={handleChange}
          name={field.name}
          className={`mb-4 w-full rounded border p-2 ${invalidFields.includes(field.name) ? 'border-red-500' : 'border-gray-300'}`}
          placeholder={field.placeholder}
        />
      ))}
      <div className="mt-4 flex space-x-4">
        <SaveCancelButtons onSave={handleSave} onCancel={onCancel} />
      </div>
    </>
  );
};
