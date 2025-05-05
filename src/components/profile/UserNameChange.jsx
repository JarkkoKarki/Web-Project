import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import SaveCancelButtons from '../SaveCancelButtons';
import {useUserContext} from '../hooks/contextHooks';
import {useUpdateUser} from '../hooks/apiHooks';

export const UserNameChange = ({onSave, onCancel}) => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const {putUser} = useUpdateUser();
  const [names, setNames] = useState({
    first_name: '',
    last_name: '',
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNames((prev) => ({
      ...prev,
      [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    }));
  };

  const handleSave = async () => {
    const missingFields = Object.keys(names).filter((key) => !names[key]);
    if (names.first_name.length < 2) {
      setInvalidFields(['first_name']);
      alert(t('profilePage.name-length-error'));
      return;
    }
    if (names.last_name.length < 2) {
      setInvalidFields(['last_name']);
      alert(t('profilePage.name-length-error'));
      return;
    }

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      return;
    }
    
    try {
      // Create a complete user object with updated name fields
      const userData = {
        ...user,
        first_name: names.first_name,
        last_name: names.last_name
      };
      
      // Send the complete user data to the backend
      const response = await putUser(userData);
      
      // Save the token immediately after a successful update
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        console.log('JWT token updated in localStorage after name change');
      }
      
      // Call the parent component's onSave with the updated user data
      onSave(userData);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const nameFields = [
    {name: 'first_name', placeholder: t('profilePage.first-name')},
    {name: 'last_name', placeholder: t('profilePage.last-name')},
  ];

  return (
    <>
      <h2 className="mb-8 text-xl font-bold">{t('profilePage.change-name')}</h2>
      {nameFields.map((field) => (
        <input
          key={field.name}
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          value={names[field.name]}
          onChange={handleChange}
          className={`mb-4 w-full rounded border p-2 ${invalidFields.includes(field.name) ? 'border-red-500' : 'border-gray-300'}`}
        />
      ))}
      <div>
        <SaveCancelButtons onSave={handleSave} onCancel={onCancel} />
      </div>
    </>
  );
};
