import {useTranslation} from 'react-i18next';

const useValidator = () => {
  const {t} = useTranslation();
  const validateManageMenuInputs = (inputs) => {
    const trimmed = {
      ...inputs,
      name_fi: inputs.name_fi.trim(),
      name_en: inputs.name_en.trim(),
      desc_fi: inputs.desc_fi.trim(),
      desc_en: inputs.desc_en.trim(),
    };
    if (
      !trimmed.name_fi ||
      !trimmed.name_en ||
      !trimmed.desc_fi ||
      !trimmed.desc_en
    ) {
      return {
        isValid: false,
        errorMessage: t('manageMenu.all-fields-required'),
      };
    }

    const price = parseFloat(inputs.price);
    if (isNaN(price)) {
      return {
        isValid: false,
        errorMessage: t('manageMenu.invalid-price'),
      };
    }
    trimmed.price = price;

    return {
      isValid: true,
      values: trimmed,
    };
  };

  return {validateManageMenuInputs};
};

export default useValidator;
