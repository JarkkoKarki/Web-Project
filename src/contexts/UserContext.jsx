import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../components/hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const updateUser = (updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
  };

  const {postLogin} = useAuthentication();
  const {getUserByToken, postUser} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    const loginResult = await postLogin(credentials);
    localStorage.setItem('token', loginResult.token);
    setUser(loginResult.user);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const userResponse = await getUserByToken(token);
        localStorage.setItem('user_id', userResponse.id);
        setUser(userResponse);
        navigate(location.pathname);

        if (location.pathname !== '/') {
          navigate(location.pathname);
        }
      }
    } catch (e) {
      handleLogout();
      console.error(e.message);
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      const registerResult = await postUser(registrationData);

      navigate('/');
    } catch (e) {
      console.error('Registration failed:', e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        handleLogin,
        handleLogout,
        handleAutoLogin,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
