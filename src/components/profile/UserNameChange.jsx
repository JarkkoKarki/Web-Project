import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import SaveCancelButtons from './SaveCancelButtons';

export const UserNameChange = ({onSave, onCancel}) => {
  const {t} = useTranslation();
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

  const handleSave = () => {
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
    onSave(names);
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
