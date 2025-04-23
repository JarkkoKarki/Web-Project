import {useCallback} from 'react';
import { fetchData } from '../../utils/fetchData';
import { url } from '../../utils/variables';

const useAuthentication = () => {
  const postLogin = async (inputs) => {

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(url + "/auth/login",
      fetchOptions,
    );

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
    return await fetchData(url + "/users" ,
      fetchOptions,
    );
  };

  const getUserByToken = useCallback(async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };

    const userResult = await fetchData(url + '/auth/me',
      fetchOptions,
    );

    console.log('userResult', userResult);

    return userResult;
  }, []);

  return {getUserByToken, postUser};
};

export { useAuthentication, useUser};
