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
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

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

  const deleteUser = async (userId) => {
    if (!confirm(t('manageUsers.confirmDelete'))) {
      return;
    }

    setIsDeleting(true);
    setDeleteError('');

    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      };

      await fetchData(`${url}/users/${userId}`, fetchOptions);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setDeleteError(t('manageUsers.deleteError'));
    } finally {
      setIsDeleting(false);
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

      {deleteError && (
        <div className="mb-4 rounded bg-red-700 p-3 text-white">
          {deleteError}
        </div>
      )}

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
              <th className="border-b-2 border-yellow-500 px-6 py-3 text-left text-lg">
                {t('manageUsers.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((userData) => (
              <tr key={userData.id} className="hover:bg-gray-800">
                <td className="border-b border-gray-700 px-6 py-4">
                  {userData.username || '-'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {userData.email || '-'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {userData.role || 'user'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {formatDate(getDateObject(userData.created_at)) || '-'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {formatTime(getDateObject(userData.created_at)) || '-'}
                </td>
                <td className="border-b border-gray-700 px-6 py-4">
                  {userData.role !== 'admin' &&
                    userData.role !== 'employee' && (
                      <button
                        onClick={() => deleteUser(userData.id)}
                        disabled={isDeleting}
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:bg-red-800 disabled:opacity-70"
                      >
                        {isDeleting
                          ? t('manageUsers.deleting')
                          : t('manageUsers.delete')}
                      </button>
                    )}
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
