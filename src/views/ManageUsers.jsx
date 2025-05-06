import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useUserContext} from '../components/hooks/contextHooks';
import {fetchData} from '../utils/fetchData';
import {url} from '../utils/variables';
import {formatDate, formatTime} from '../utils/formatters';

const ManageUsers = () => {
  const {t} = useTranslation();
  const {user} = useUserContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      getAllUsers();
    }
  }, [user]);

  const getAllUsers = async () => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      };
      const fetchedUsers = await fetchData(url + '/users', fetchOptions);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getDateObject = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  return (
    <div>
      <h1 className="mb-4 text-center text-3xl font-semibold text-yellow-500">
        {t('manageUsers.title')}
      </h1>
      <div className="p-8">
        <table className="min-w-full table-auto border border-[#2a2c2b] p-8">
          <thead>
            <tr>
              <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                {t('manageUsers.username')}
              </th>
              <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                {t('manageUsers.email')}
              </th>
              <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                {t('manageUsers.role')}
              </th>
              <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                {t('manageUsers.date')}
              </th>
              <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                {t('manageUsers.time')}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800">
                <td className="border-b border-gray-700 px-6 py-4">
                  {user.username || '-'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {user.email || '-'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {user.role || 'user'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {formatDate(getDateObject(user.created_at)) || '-'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {formatTime(getDateObject(user.created_at)) || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
