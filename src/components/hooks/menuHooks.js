import {useEffect, useState} from 'react';
import {rootUrl, url} from '../../utils/variables';
import {fetchData} from '../../utils/fetchData';

const useMenu = () => {
  const [menuArray, setMenuArray] = useState([]);
  const [fullMenuArray, setFullMenuArray] = useState([]);

  const getMenu = async () => {
    try {
      const mediaData = await fetchData(url + '/menu/products');
      setFullMenuArray(mediaData);
      console.log(mediaData);
      const favorites = mediaData.filter((item) =>
        item.categories.includes("everyone's favorite"),
      );

      const transformedFavorites = favorites.map((item) => ({
        src: rootUrl + item.filename,
        name: item.name,
        price: item.price,
      }));

      setMenuArray(transformedFavorites);
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
    formData.append('categories', inputs.categories);
    formData.append('diets', inputs.diets);
    formData.append('file', file);
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

  const deleteMenuItem = async (id) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        mode: 'cors',
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
    formData.append('categories', inputs.categories);
    formData.append('diets', inputs.diets);
    formData.append('file', file);
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
    menuArray,
    postMenuItem,
    fullMenuArray,
    deleteMenuItem,
    updateMenuItem,
  };
};

export default useMenu;
