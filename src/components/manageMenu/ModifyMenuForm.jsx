import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import useMenu from '../hooks/menuHooks.js';
import {rootUrl} from '../../utils/variables.js';
import MenuCheckbox from './MenuCheckbox.jsx';
import FileUpload from './FileUpload.jsx';
import MenuInputGroup from './MenuInputGroup.jsx';

const ModifyMenuForm = ({item, setSelectedItem, onSuccess}) => {
  const {t} = useTranslation();
  const [file, setFile] = useState(null);
  const {updateMenuItem, deleteMenuItem} = useMenu();

  const mapLabelsToIds = (labels, options) => {
    return options
      .filter((option) => labels.includes(option.label))
      .map((option) => option.id);
  };

  const dietOptions = [
    {id: 1, labelKey: 'dietOptions.animal_based'},
    {id: 2, labelKey: 'dietOptions.gluten_free'},
    {id: 3, labelKey: 'dietOptions.induction_low_carb'},
    {id: 4, labelKey: 'dietOptions.lactose_free'},
    {id: 5, labelKey: 'dietOptions.mediterranean'},
    {id: 6, labelKey: 'dietOptions.vegetarian'},
    {id: 7, labelKey: 'dietOptions.vegan_soy_free'},
  ];

  const categoryOptions = [
    {id: 1, labelKey: 'categoryOptions.starter'},
    {id: 2, labelKey: 'categoryOptions.main_course'},
    {id: 3, labelKey: 'categoryOptions.dessert'},
    {id: 4, labelKey: 'categoryOptions.sides'},
    {id: 5, labelKey: 'categoryOptions.favorites'},
    {id: 6, labelKey: 'categoryOptions.fields_of_vegan'},
    {id: 7, labelKey: 'categoryOptions.special_offer'},
    {id: 8, labelKey: 'categoryOptions.drinks'},
  ];

  const [inputs, setInputs] = useState({
    name_fi: item.name_fi,
    name_en: item.name_en,
    desc_fi: item.desc_fi,
    desc_en: item.desc_en,
    price: item.price,
    categories: mapLabelsToIds(item.categories, categoryOptions),
    diets: mapLabelsToIds(item.diets, dietOptions),
  });

  const handleBack = () => {
    setSelectedItem(null);
  };

  const handleCheckboxChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    setInputs((prevInputs) => {
      const currentArray = prevInputs[type];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      return {
        ...prevInputs,
        [type]: newArray,
      };
    });
  };

  const doModifyMenuItem = async () => {
    try {
      if (!inputs.name_fi.trim() ||
        !inputs.name_en.trim() ||
        !inputs.desc_fi.trim() ||
        !inputs.desc_en.trim() ||
        !inputs.price.trim()) {
        alert(t('manageMenu.all-fields-required'));
        return;
      }
      console.log(file);
      const token = localStorage.getItem('token');
      const menuResult = await updateMenuItem(file, inputs, item.id, token);
      console.log('menuresult', menuResult);
      alert('Item Modified successfully');
      setSelectedItem(null);
      onSuccess();
    } catch (e) {
      console.log(e.message);
    }
  };

  const doDeleteMenuItem = async () => {
    try {
      const token = localStorage.getItem('token');
      const menuResult = await deleteMenuItem(item.id, token);
      console.log('Menuresult', menuResult);
      setSelectedItem(null);
      alert('Item Deleted successfully');
      onSuccess();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFileChange = (evt) => {
    if (evt.target.files[0]) {
      console.log("new file", evt.target.files[0]);
      setFile(evt.target.files[0]);
    }else {
        console.log("No file selected");
      }
  };

  return (
    <div className="p-8">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex w-full max-w-5xl flex-col items-start rounded-lg border border-[#2a2c2b] bg-[#0d0f0e] p-5 shadow-lg"
      >
        <button
          onClick={handleBack}
          className="mb-4 cursor-pointer rounded border border-yellow-500 px-4 py-2 font-semibold transition hover:bg-yellow-500 hover:text-black self-start"
        >
          X
        </button>
        <div className="flex w-full flex-row gap-8">
          <FileUpload
            id="modifyFile"
            file={file}
            onFileChange={handleFileChange}
            filename={item.filename}
            rootUrl={rootUrl}
            label={t('manageMenu.menu-item-button')}
          />

          <div className="flex flex-grow flex-col gap-4 ">
            <MenuInputGroup
              inputs={inputs}
              handleInputChange={handleInputChange}
              t={t}
            />
          </div>
        </div>
        <MenuCheckbox
          title={t('manageMenu.menu-item-categories')}
          name="categories"
          options={categoryOptions.map(option => ({
            ...option, label: t(option.labelKey)
          }))}
          selectedValues={inputs.categories}
          onChange={handleCheckboxChange}
        />

        <MenuCheckbox
          title={t('manageMenu.menu-item-diets')}
          name="diets"
          options={dietOptions.map(option => ({
            ...option, label: t(option.labelKey)
          }))}
          selectedValues={inputs.diets}
          onChange={handleCheckboxChange}
        />

        <div className="mt-8 flex w-full justify-between">
          <button
            type="button"
            onClick={doDeleteMenuItem}
            className="cursor-pointer rounded-sm border border-red-500 bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            {t('manageMenu.menu-item-delete')}
          </button>

          <button
            type="button"
            onClick={doModifyMenuItem}
            className="cursor-pointer rounded-sm border border-green-500 bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
          >
            {t('manageMenu.menu-item-modify')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModifyMenuForm;
