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
  const [roleUpdateLoading, setRoleUpdateLoading] = useState(false);
  const [roleUpdateError, setRoleUpdateError] = useState('');
  const [availableRoles] = useState(['user', 'employee', 'admin']);

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

  const updateUserRole = async (userId, newRole, userData) => {
    if (!confirm(t('manageUsers.confirmRoleChange'))) {
      return;
    }

    setRoleUpdateLoading(true);
    setRoleUpdateError('');

    try {
      const updatedUserData = {
        ...userData,
        role: newRole,
      };

      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
        body: JSON.stringify(updatedUserData),
      };

      // eslint-disable-next-line no-unused-vars
      const updatedUser = await fetchData(
        `${url}/users/${userId}`,
        fetchOptions,
      );

      setUsers(users.map((u) => (u.id === userId ? {...u, role: newRole} : u)));
    } catch (error) {
      console.error('Error updating user role:', error);
      setRoleUpdateError(t('manageUsers.roleUpdateError'));
    } finally {
      setRoleUpdateLoading(false);
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
    <div className="mx-auto max-w-screen p-4">
      <h1 className="mb-4 text-center text-xl font-semibold text-yellow-500 lg:text-3xl">
        {t('manageUsers.title')}
      </h1>

      {deleteError && (
        <div className="mb-4 rounded bg-red-700 p-3 text-white">
          {deleteError}
        </div>
      )}

      {roleUpdateError && (
        <div className="mb-4 rounded bg-red-700 p-3 text-white">
          {roleUpdateError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-[#2a2c2b]">
          <thead>
            <tr>
              <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm lg:px-6 lg:text-lg">
                {t('manageUsers.username')}
              </th>
              <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm lg:px-6 lg:text-lg">
                {t('manageUsers.email')}
              </th>
              <th className="hidden border-b-2 border-yellow-500 px-2 py-3 text-left text-sm lg:table-cell lg:px-6 lg:text-lg">
                {t('manageUsers.role')}
              </th>
              <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm lg:px-6 lg:text-lg">
                {t('manageUsers.date')}
              </th>
              <th className="hidden border-b-2 border-yellow-500 px-2 py-3 text-left text-sm lg:table-cell lg:px-6 lg:text-lg">
                {t('manageUsers.time')}
              </th>
              <th className="border-b-2 border-yellow-500 px-2 py-3 text-left text-sm lg:px-6 lg:text-lg">
                {t('manageUsers.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((userData) => (
              <tr key={userData.id} className="hover:bg-gray-800">
                <td className="border-b border-gray-700 px-2 py-4 text-sm lg:px-6 lg:text-base">
                  {userData.username || '-'}
                </td>
                <td className="border-b border-gray-700 px-2 py-4 text-sm lg:px-6 lg:text-base">
                  {userData.email || '-'}
                </td>
                <td className="hidden border-b border-gray-700 px-2 py-4 text-sm lg:table-cell lg:px-6 lg:text-base">
                  {userData.role || 'user'}
                </td>
                <td className="border-b border-gray-700 px-2 py-4 text-sm lg:px-6 lg:text-base">
                  {formatDate(getDateObject(userData.created_at)) || '-'}
                </td>
                <td className="hidden border-b border-gray-700 px-2 py-4 text-sm lg:table-cell lg:px-6 lg:text-base">
                  {formatTime(getDateObject(userData.created_at)) || '-'}
                </td>
                <td className="border-b border-gray-700 px-2 py-4 text-sm lg:px-6 lg:text-base">
                  {user?.role === 'admin' && (
                    <select
                      value={userData.role || 'user'}
                      onChange={(e) =>
                        updateUserRole(userData.id, e.target.value, userData)
                      }
                      disabled={roleUpdateLoading}
                      className="mb-4 rounded border border-gray-700 bg-gray-800 px-2 py-1 text-white"
                    >
                      {availableRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  )}
                  {userData.role !== 'admin' &&
                    userData.role !== 'employee' && (
                      <button
                        onClick={() => deleteUser(userData.id)}
                        disabled={isDeleting}
                        className="ml-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:bg-red-800 disabled:opacity-70"
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
