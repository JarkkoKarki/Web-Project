import {useEffect, useState} from 'react';
import {rootUrl, url} from '../../utils/variables';
import {fetchData} from '../../utils/fetchData';

const useMenu = () => {
  const [favoritesMenuArray, setFavoritesMenuArray] = useState([]);
  const [fullMenuArray, setFullMenuArray] = useState([]);

  const getMenu = async () => {
    try {
      const mediaData = await fetchData(url + '/menu/products');

      console.log(mediaData, ' mediadata debug');
      const favorites = mediaData.filter((item) =>
        item.categories.includes("everyone's favorite"),
      );

      const transformedFavorites = favorites.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        diets: item.diets,
        src: rootUrl + item.filename,
        price: item.price,
      }));

      const transformedMenu = mediaData.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        diets: item.diets,
        src: rootUrl + item.filename,
        price: item.price,
      }));
      console.log(transformedMenu, ' TESTI');
      setFullMenuArray(transformedMenu);
      setFavoritesMenuArray(transformedFavorites);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  const postMenuItem = async (file, inputs, token) => {
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('description', inputs.description);
    formData.append('price', inputs.price);
    formData.append('file', file);
    inputs.categories.forEach((category) =>
      formData.append('categories[]', category),
    );
    inputs.diets.forEach((diet) => formData.append('diets[]', diet));

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      mode: 'cors',
      body: formData,
    };

    return await fetchData(url + '/menu', fetchOptions);
  };

  const deleteMenuItem = async (id, token) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
      return await fetchData(`${url}/menu/${id}`, fetchOptions);
    } catch (e) {
      console.error('Error deleting menu item:', e);
    }
  };

  const updateMenuItem = async (file, inputs, id, token) => {
    const formData = new FormData();
    formData.append('name', inputs.name);
    formData.append('description', inputs.description);
    formData.append('price', inputs.price);
    formData.append('file', file);

    inputs.categories.forEach((category) =>
      formData.append('categories[]', category),
    );

    inputs.diets.forEach((diet) => formData.append('diets[]', diet));

    const fetchOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      mode: 'cors',
      body: formData,
    };

    return await fetchData(`${url}/menu/${id}`, fetchOptions);
  };

  return {
    favoritesMenuArray,
    getMenu,
    postMenuItem,
    fullMenuArray,
    deleteMenuItem,
    updateMenuItem,
  };
};

export default useMenu;
