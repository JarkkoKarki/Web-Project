import React, {useState} from 'react';
import useForm from '../hooks/formHooks.js';
import useMenu from '../hooks/menuHooks.js';
import {useTranslation} from 'react-i18next';


const AddMenuForm = () => {
  const {t} = useTranslation();
  const [file, setFile] = useState(null);
  const {postMenuItem} = useMenu();

  const initValues = {
    name: '',
    description: '',
    price: '',
    filename: '',
    categories: [],
    diets: []
  };

  const doAddMenuForm = async () => {
    try {
      if (!inputs.name.trim() || !inputs.description.trim() || !inputs.price.trim()) {
        alert(t(  'manageMenu.all-fields-required'));
        return;
      }

      if (!file) {
        alert(t('manageMenu.file-field-required'));
        return;
      }

      const menuResult = await postMenuItem(file, inputs);
      console.log('menuresult', menuResult);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doAddMenuForm, initValues);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };


  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
        {t('manageMenu.add-menu-title')}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-8 items-start bg-[#0d0f0e] p-8 rounded-lg shadow-lg border border-[#2a2c2b] w-full max-w-5xl mx-auto"
      >

        <div className="flex flex-col items-center">
          <label htmlFor="file" className="text-sm text-gray-300 mb-2">
            {t('manageMenu.menu-item-file')}
          </label>

          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="file"
            className="cursor-pointer font-semibold px-4 py-2 rounded transition mb-4 border border-yellow-500 hover:bg-yellow-500 hover:text-black transition"
          >
            {file ? file.name : t('manageMenu.menu-item-button')}
          </label>

          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://placehold.co/300x200?text=Choose+image'
            }
            alt="preview"
            className="w-[300px] h-[200px] object-cover rounded border border-gray-600"
          />
        </div>

        <div className="flex flex-col flex-grow gap-4">
          <input
            name="name"
            type="text"
            id="name"
            value={inputs.name}
            onChange={handleInputChange}
            placeholder={t('manageMenu.menu-item-name')}
            className="bg-[#101211] text-white border border-[#2a2c2b] rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
          />

          <input
            name="description"
            type="text"
            id="description"
            value={inputs.description}
            onChange={handleInputChange}
            placeholder={t('manageMenu.menu-item-description')}
            className="bg-[#101211] text-white border border-[#2a2c2b] rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
          />

          <input
            name="price"
            type="text"
            id="price"
            value={inputs.price}
            onChange={handleInputChange}
            placeholder={t('manageMenu.menu-item-price')}
            className="bg-[#101211] text-white border border-[#2a2c2b] rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
          />

          <input
            name="categories"
            type="text"
            id="categories"
            value={inputs.categories}
            onChange={handleInputChange}
            placeholder={t('manageMenu.menu-item-categories')}
            className="bg-[#101211] text-white border border-[#2a2c2b] rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
          />

          <input
            name="diets"
            type="text"
            id="diets"
            value={inputs.diets}
            onChange={handleInputChange}
            placeholder={t('manageMenu.menu-item-diets')}
            className="bg-[#101211] text-white border border-[#2a2c2b] rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
          />

          <button
            type="submit"
            className="cursor-pointer mt-4 py-1 rounded-sm border border-yellow-500 hover:bg-yellow-500 hover:text-black transition"
          >
            {t('manageMenu.menu-item-submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenuForm;
