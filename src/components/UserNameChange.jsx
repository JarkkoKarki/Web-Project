import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import SaveCancelButtons from './SaveCancelButtons';

export const UserNameChange = ({onSave, onCancel}) => {
  const {t} = useTranslation();
  const [names, setNames] = useState({
    firstName: '',
    lastName: '',
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNames((prev) => ({
      ...prev,
      [name]: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    }));
  };

  const handleSave = () => {
    const missingFields = Object.keys(names).filter((key) => !names[key]);
    if (names.firstName.length < 2) {
      setInvalidFields(['firstName']);
      alert(t('profilePage.name-length-error'));
      return;
    }
    if (names.lastName.length < 2) {
      setInvalidFields(['lastName']);
      alert(t('profilePage.name-length-error'));
      return;
    }

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      return;
    }
    onSave(names);
  };

  const nameFields = [
    {name: 'firstName', placeholder: t('profilePage.first-name')},
    {name: 'lastName', placeholder: t('profilePage.last-name')},
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
