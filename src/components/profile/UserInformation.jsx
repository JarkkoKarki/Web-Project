import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {UserContext} from '../../contexts/UserContext';
import {PasswordUpdate} from './PasswordUpdate';
import SaveCancelButtons from '../SaveCancelButtons';
import {UserNameChange} from './UserNameChange';
import {useUpdateUser} from '../hooks/apiHooks';
import DeleteUserButton from './DeleteUserButton';

export const UserInformation = () => {
  const {t} = useTranslation();

  const {user, updateUser} = useContext(UserContext);
  const [editingField, setEditingField] = useState(null);
  const [temp, setTemp] = useState('');
  const {putUser} = useUpdateUser();

  const clickHandler = (field) => {
    setEditingField(field);
    if (field === 'name') {
      setTemp({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
      });
    } else if (field === 'password') {
      setTemp({currentPassword: '', newPassword: '', confirmPassword: ''});
    } else {
      setTemp(user[field] || '');
    }
    console.log(`${field} clicked`);
  };

  const handleSave = async () => {
    try {
      let updatedUser;
      if (editingField === 'name') {
        updatedUser = {
          ...user, // Include the complete user object
          first_name: temp.first_name,
          last_name: temp.last_name,
        };
      } else if (editingField === 'password') {
        updatedUser = {
          ...user, // Include the complete user object
          password: temp.newPassword,
        };
        console.log('Password changed:', temp);
      } else {
        updatedUser = {
          ...user, // Include the complete user object
          [editingField]: temp,
        };
      }

      const response = await putUser(updatedUser);
      console.log('response:', response);

      if (response) {
        console.log('User updated:', response);

        // Update the user context with the changed fields
        if (editingField === 'name') {
          updateUser({
            first_name: temp.first_name,
            last_name: temp.last_name,
          });
        } else if (editingField === 'password') {
          // No need to update the user state for password changes
        } else {
          updateUser({
            [editingField]: temp,
          });
        }

        // Always save the JWT token after successful updates
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log('JWT token updated in localStorage');
        }
      } else {
        console.error('Failed to update user');
      }

      setEditingField(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancel = () => {
    console.log('id:', user.id);
    setEditingField(null);
  };

  const handleNameUpdate = async (userData) => {
    try {
      const response = await putUser(userData);
      if (response) {
        // Update only the changed name fields in the user context
        updateUser({
          first_name: userData.first_name,
          last_name: userData.last_name,
        });

        // Always save the JWT token after successful updates
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log('JWT token updated in localStorage after name update');
        }
      }
      setEditingField(null);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handlePasswordUpdate = async (userData) => {
    try {
      const response = await putUser(userData);
      // Always save the JWT token after successful updates
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        console.log('JWT token updated in localStorage after password update');
      }
      setEditingField(null);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const profileInfo = [
    {
      label: t('profilePage.name'),
      field: 'name',
      value: `${user.first_name || ''} ${user.last_name || ''}`,
    },
    {label: t('profilePage.username'), field: 'username', value: user.username},
    {label: t('profilePage.password'), field: 'password', value: '**********'},
    {label: t('profilePage.email'), field: 'email', value: user.email},
    {label: t('profilePage.address'), field: 'address', value: user.address},
    {label: t('profilePage.phone-number'), field: 'phone', value: user.phone},
  ];

  return (
    <div className="flex h-full w-4/5 flex-col items-start space-y-4 md:w-1/3">
      <h3 className="mb-8 self-center text-xl font-bold text-wrap md:self-start md:text-2xl">
        {t('profilePage.user-information')}
      </h3>
      {profileInfo.map((info, index) => (
        <div
          key={index}
          className={`w-full ${
            editingField !== null && editingField !== info.field ? 'hidden' : ''
          }`}
        >
          {editingField === info.field ? (
            info.field === 'password' ? (
              <PasswordUpdate
                onSave={handlePasswordUpdate}
                onCancel={handleCancel}
              />
            ) : info.field === 'name' ? (
              <div className="flex flex-col space-y-2">
                <UserNameChange
                  onSave={handleNameUpdate}
                  onCancel={handleCancel}
                />
              </div>
            ) : (
              <div className="mt-6 flex flex-col space-y-8">
                <h2 className="mb-8 text-xl font-bold">
                  {t(`profilePage.change-${info.field}`)}
                </h2>
                <input
                  type="text"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                  placeholder={info.label}
                />
                <SaveCancelButtons
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </div>
            )
          ) : editingField === null ? (
            <div
              className="flex w-full cursor-pointer items-center justify-between rounded border-1 border-[#000000] bg-[#101211] p-2 text-center text-xl hover:border-[#000000] hover:bg-[#1c1e24]"
              onClick={() => clickHandler(info.field)}
            >
              <span className="text-sm md:text-xl">{info.label}</span>
              <span className="flex items-center space-x-2">
                <span className="text-sm md:text-xl">{info.value}</span>
                <span className="font-bold">{'>'}</span>
              </span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default UserInformation;
