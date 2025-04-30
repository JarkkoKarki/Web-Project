import React, {useState} from 'react';
import useForm from '../hooks/formHooks.js';
import useMenu from '../hooks/menuHooks.js';
import {useTranslation} from 'react-i18next';

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
    name: '',
    description: '',
    price: '',
    filename: '',
    categories: [],
    diets: [],
  };

  const doAddMenuForm = async () => {
    console.log(inputs);
    try {
      if (
        !inputs.name.trim() ||
        !inputs.description.trim() ||
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
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit, handleCheckboxChange} =
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
          <div className="w-full md:w-1/3 flex flex-col items-center">
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
              className="mb-4 cursor-pointer rounded border border-yellow-500
              px-4 py-2 font-semibold transition hover:bg-yellow-500 hover:text-black"
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
              className="h-[200px] w-[300px] max-w-full rounded border border-gray-600 object-cover"
            />
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-7 pt-23">
            <input
              name="name"
              type="text"
              id="name"
              value={inputs.name}
              onChange={handleInputChange}
              placeholder={t('manageMenu.menu-item-name')}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211]
              px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input
              name="description"
              type="text"
              id="description"
              value={inputs.description}
              onChange={handleInputChange}
              placeholder={t('manageMenu.menu-item-description')}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211]
              px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />

            <input
              name="price"
              type="text"
              id="price"
              value={inputs.price}
              onChange={handleInputChange}
              placeholder={t('manageMenu.menu-item-price')}
              className="w-full rounded border border-[#2a2c2b] bg-[#101211]
              px-4 py-2 text-lg text-white focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
          </div>
        </div>


        <div className="mb-6 border-b border-gray-600 pb-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2 ">
            {t('manageMenu.menu-item-categories')}
          </h3>
          <div className="flex flex-wrap gap-4">
            {categoryOptions.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 text-white"
              >
                <input
                  name="categories"
                  type="checkbox"
                  value={category.id}
                  checked={inputs.categories.includes(category.id)}
                  onChange={handleCheckboxChange}
                />
                {category.label}
              </label>
            ))}
          </div>
        </div>


        <div className="mb-6 border-b border-gray-600 pb-4">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2 ">
            {t('manageMenu.menu-item-diets')}
          </h3>
          <div className="flex flex-wrap gap-4">
            {dietOptions.map((diet) => (
              <label
                key={diet.id}
                className="flex items-center gap-2 text-white"
              >
                <input
                  type="checkbox"
                  name="diets"
                  value={diet.id}
                  checked={inputs.diets.includes(diet.id)}
                  onChange={handleCheckboxChange}
                />
                {diet.label}
              </label>
            ))}
          </div>
        </div>

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
