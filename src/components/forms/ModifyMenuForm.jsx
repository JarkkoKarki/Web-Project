import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMenu from '../hooks/menuHooks.js';
import { rootUrl } from '../../utils/variables.js';

const ModifyMenuForm = ({ item, setSelectedItem }) => {
  const { t } = useTranslation();
  const { updateMenuItem, deleteMenuItem} = useMenu();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(rootUrl + item.filename);

  const [inputs, setInputs] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    filename: item.filename,
    categories: [item.categories],
    diets: [item.diets],
  });

  const handleBack = () => {
    setSelectedItem(null);
  };

  const doModifyMenuItem = async () => {
    try {
      if (!inputs.name.trim() || !inputs.description.trim() || !inputs.price.trim()) {
        alert(t(  'manageMenu.all-fields-required'));
        return;
      }

      const token = localStorage.getItem('token');
      const menuResult = await updateMenuItem(file, inputs, item.id, token);
      console.log('menuresult', menuResult);
      setSelectedItem(null);
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
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFileChange = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      const newFile = evt.target.files[0];
      setFile(newFile);

      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }


      const newPreviewUrl = URL.createObjectURL(newFile);
      setPreviewUrl(newPreviewUrl);


      setInputs((prevInputs) => ({
        ...prevInputs,
        filename: newFile.name,
      }));
    }
  };

  return (
    <div className="p-8">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex w-full max-w-5xl items-start rounded-lg border border-[#2a2c2b] bg-[#0d0f0e] p-8 shadow-lg relative"
      >
        <button
          onClick={handleBack}
          className="mb-4 cursor-pointer rounded border border-yellow-500 px-4 py-2 font-semibold transition hover:bg-yellow-500 hover:text-black"
        >
          X
        </button>
        <div className="flex w-full gap-8">
          <div className="flex flex-shrink-0 flex-col items-center">
            <label htmlFor="file" className="mb-2 text-sm text-gray-300">
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
              className="mb-4 cursor-pointer rounded border border-yellow-500 px-4 py-2 font-semibold transition hover:bg-yellow-500 hover:text-black"
            >
              {file ? file.name : t('manageMenu.menu-item-button')}
            </label>

            <img
              src={previewUrl}
              alt="preview"
              className="h-[200px] w-[300px] rounded border border-gray-600 object-cover"
            />
          </div>

          <div className="flex flex-grow flex-col gap-4">
            <input
              name="name"
              type="text"
              id="name"
              value={inputs.name}
              onChange={handleInputChange}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211] px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input
              name="description"
              type="text"
              id="description"
              value={inputs.description}
              onChange={handleInputChange}
              placeholder={t('manageMenu.menu-item-description')}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211] px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input
              name="price"
              type="text"
              id="price"
              value={inputs.price}
              onChange={handleInputChange}
              placeholder={t('manageMenu.menu-item-price')}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211] px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input
              name="categories"
              type="text"
              id="categories"
              value={inputs.categories}
              onChange={handleInputChange}
              placeholder={t('manageMenu.menu-item-categories')}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211] px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input
              name="diets"
              type="text"
              id="diets"
              value={inputs.diets}
              onChange={handleInputChange}
              placeholder={t('manageMenu.menu-item-diets')}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211] px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <div className="mt-4 flex justify-between gap-4">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyMenuForm;
