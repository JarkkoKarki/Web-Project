import {useCallback} from 'react';
import {fetchData} from '../../utils/fetchData';
import {url} from '../../utils/variables';

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
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    const userResult = await fetchData(url + '/auth/me', fetchOptions);

    // console.log('userResult', userResult);

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
  const updateUser = useCallback(async (inputs) => {
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

  return updateUser;
};

export {useAuthentication, useUser, useUpdateUser};
