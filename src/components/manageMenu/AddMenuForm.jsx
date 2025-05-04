import React, {useState} from 'react';
import useForm from '../hooks/formHooks.js';
import useMenu from '../hooks/menuHooks.js';
import {useTranslation} from 'react-i18next';
import MenuInput from './MenuInput.jsx';
import MenuCheckbox from './MenuCheckbox.jsx';
import FileUpload from './FileUpload.jsx';
import MenuInputGroup from './MenuInputGroup.jsx';

const AddMenuForm = ({onSuccess}) => {
  const {t} = useTranslation();
  const [file, setFile] = useState(null);
  const {postMenuItem} = useMenu();

  const dietOptions = [
    {id: 1, label: 'A - Animal-based'},
    {id: 2, label: 'G - Gluten-free'},
    {id: 3, label: 'ILM - Induction low-carb method'},
    {id: 4, label: 'L - Lactose-free'},
    {id: 5, label: 'M - Mediterranean'},
    {id: 6, label: 'Veg - Vegetarian'},
    {id: 7, label: 'VS - Vegan and soy-free'},
  ];

  const categoryOptions = [
    {id: 1, label: 'starter'},
    {id: 2, label: 'main course'},
    {id: 3, label: 'dessert'},
    {id: 4, label: 'sides'},
    {id: 5, label: 'favorites'},
    {id: 6, label: 'fields of vegan'},
    {id: 7, label: 'special offer'},
    {id: 8, label: 'drinks'},
  ];

  const initValues = {
    name_fi: '',
    name_en: '',
    desc_fi: '',
    desc_en: '',
    price: '',
    filename: '',
    categories: [],
    diets: [],
  };

  const doAddMenuForm = async () => {
    console.log(inputs);
    try {
      if (
        !inputs.name_fi.trim() ||
        !inputs.name_en.trim() ||
        !inputs.desc_fi.trim() ||
        !inputs.desc_en.trim() ||
        !inputs.price.trim()
      ) {
        alert(t('manageMenu.all-fields-required'));
        return;
      }

      if (!file) {
        alert(t('manageMenu.file-field-required'));
        return;
      }
      const token = localStorage.getItem('token');
      const menuResult = await postMenuItem(file, inputs, token);
      console.log('menuresult', menuResult);
      alert('Menu item added successfully');
      onSuccess();
      setFile(null);
      resetForm();
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit, handleCheckboxChange, resetForm} =
    useForm(doAddMenuForm, initValues);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  return (
    <div className="p-8">
      <h2 className="mb-6 text-center text-3xl font-bold text-yellow-500">
        {t('manageMenu.add-menu-title')}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-5xl rounded-lg border border-[#2a2c2b] bg-[#0d0f0e] p-5 shadow-lg"
      >

        <div className="flex flex-col md:flex-row gap-8 mb-6">
         <FileUpload
           id="addFile"
           file={file}
           onFileChange={handleFileChange}
           placeholder="https://placehold.co/300x200?text=Choose+image"
           label={t('manageMenu.menu-item-button')}
         />

          <div className="w-full md:w-2/3 flex flex-col gap-2 ">
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
          options={categoryOptions}
          selectedValues={inputs.categories}
          onChange={handleCheckboxChange}
        />


        <MenuCheckbox
          title={t('manageMenu.menu-item-diets')}
          name="diets"
          options={dietOptions}
          selectedValues={inputs.diets}
          onChange={handleCheckboxChange}
        />

        <button
          type="submit"
          className="mt-4 w-full md:w-auto px-6 py-2 rounded border border-yellow-500
          font-semibold transition hover:bg-yellow-500 hover:text-black"
        >
          {t('manageMenu.menu-item-submit')}
        </button>
      </form>
    </div>
  );
};

export default AddMenuForm;
