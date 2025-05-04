import {useCallback} from 'react';
import {fetchData} from '../../utils/fetchData';
import {url} from '../../utils/variables';
import {useTranslation} from 'react-i18next';

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(url + '/auth/login', fetchOptions);

    window.localStorage.setItem('token', loginResult.token);

    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(url + '/users', fetchOptions);
  };

  const getUserByToken = useCallback(async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

    const userResult = await fetchData(url + '/auth/me', fetchOptions);

    return userResult;
  }, []);

  const deleteUser = useCallback(async (userId) => {
    console.log(window.localStorage.getItem('token'));
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    };

    return await fetchData(url + '/users/' + userId, fetchOptions);
  }, []);

  return {getUserByToken, postUser, deleteUser};
};

const useUpdateUser = () => {
  const putUser = useCallback(async (inputs) => {
    if (!inputs || !inputs.id) {
      throw new Error('Invalid inputs: ID is required');
    }

    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(url + '/users/' + inputs.id, fetchOptions);
  }, []);

  const updateProfilePicture = useCallback(async (file, id, user) => {
    if (!file || !user) {
      throw new Error('Invalid inputs: file and user are required');
    }

    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('id', id);
    formData.append('user', JSON.stringify(user));

    const fetchOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      mode: 'cors',
      body: formData,
    };

    return await fetchData(url + '/users/' + id, fetchOptions);
  }, []);

  return {putUser, updateProfilePicture};
};

const useOrders = () => {
  const {t} = useTranslation();
  const lang = t('menuUrl.menuUrl');
  const getOrdersByUserId = useCallback(async () => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    };

    return await fetchData(url + '/orders/myorders/' + lang, fetchOptions);
  }, []);

  return {getOrdersByUserId};
};

export {useAuthentication, useUser, useUpdateUser, useOrders};
