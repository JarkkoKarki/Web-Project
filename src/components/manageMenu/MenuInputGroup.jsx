import React from 'react';
import MenuInput from './MenuInput.jsx';

const MenuInputGroup = ({inputs, handleInputChange, t}) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-yellow-400 mb-2 text-center">{t('manageMenu.menu-name-fi')}</h3>
      <MenuInput
        name="name_fi"
        value={inputs.name_fi}
        onChange={handleInputChange}
        placeholder={t('manageMenu.add-menu-name-fi')}
      />

      <MenuInput
        name="desc_fi"
        value={inputs.desc_fi}
        onChange={handleInputChange}
        placeholder={t('manageMenu.add-menu-desc-fi')}
      />

      <h2 className="text-lg font-semibold text-yellow-400 mb-2 text-center">{t('manageMenu.menu-name-en')}</h2>
      <MenuInput
        name="name_en"
        value={inputs.name_en}
        onChange={handleInputChange}
        placeholder={t('manageMenu.add-menu-name-en')}
      />

      <MenuInput
        name="desc_en"
        value={inputs.desc_en}
        onChange={handleInputChange}
        placeholder={t('manageMenu.add-menu-desc-en')}
      />
      <h2 className="text-lg font-semibold text-yellow-400 mb-2 text-center">{t('manageMenu.menu-price')}</h2>
      <MenuInput
        name="price"
        value={inputs.price}
        onChange={handleInputChange}
        placeholder={t('manageMenu.menu-item-price')}
        type="text"
      />
    </>
  );
};

export default MenuInputGroup;
