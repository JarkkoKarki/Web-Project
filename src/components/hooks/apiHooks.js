import {useCallback, useEffect, useState} from 'react';

import {uniqBy} from 'lodash';
import { fetchData } from '../../utils/fetchData';

const authApiUrl = import.meta.env.VITE_AUTH_API;
const mediaApiUrl = import.meta.env.VITE_MEDIA_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(`${mediaApiUrl}/media`);
      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      const userData = await Promise.all(
        uniqueUserIds.map((item) =>
          fetchData(`${authApiUrl}/users/${item.user_id}`),
        ),
      );

      // duplikaattien poisto on tehtävänannon ulkopuolella, ei tarvitse toteuttaa
      const userMap = userData.reduce((map, {user_id, username}) => {
        map[user_id] = username;
        return map;
      }, {});

      const newData = mediaData.map((item) => ({
        ...item,
        username: userMap[item.user_id],
      }));

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );

    console.log('loginResult', loginResult.token);

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
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
  };

  const getUserByToken = useCallback(async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };

    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );

    console.log('userResult', userResult);

    return userResult;
  }, []);

  return {getUserByToken, postUser};
};

export {useMedia, useAuthentication, useUser};
