import {useTranslation} from 'react-i18next';
import {useUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

export const DeleteUserButton = ({userId}) => {
  const {t} = useTranslation();
  const {deleteUser} = useUser();
  const navigate = useNavigate();
  const {handleLogout} = useUserContext();

  const handleClick = async () => {
    try {
      console.log('id', userId);
      if (confirm(t('profilePage.delete-user-confirmation'))) {
        await deleteUser(userId);
        handleLogout();

        console.log('User deleted successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <div className="flex self-end">
      <button
        className="mt-6 inline-block cursor-pointer border border-red-500 px-6 py-2 text-red-500 transition hover:bg-red-500 hover:text-black"
        onClick={handleClick}
      >
        {t('profilePage.delete-user')}
      </button>
    </div>
  );
};

export default DeleteUserButton;
