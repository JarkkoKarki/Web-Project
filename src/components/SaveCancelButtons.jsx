import React from 'react';
import {useTranslation} from 'react-i18next';

const SaveCancelButtons = ({onSave, onCancel}) => {
  const {t} = useTranslation();

  return (
    <div className="flex space-x-4">
      <button
        onClick={onSave}
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        {t('profilePage.save')}
      </button>
      <button
        onClick={onCancel}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        {t('profilePage.cancel')}
      </button>
    </div>
  );
};

export default SaveCancelButtons;
