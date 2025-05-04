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
    console.log('login result', loginResult);
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
        console.log(token, ' TOKENI');
        const userResponse = await getUserByToken(token);
        console.log('------------USER OBJEKTI---------', userResponse);
        console.log('ID: ', userResponse.user_id);
        localStorage.setItem('user_id', userResponse.user_id);
        setUser(userResponse);
        // console.log('location', location);
        navigate(location.pathname);

        if (location.pathname !== '/') {
          navigate(location.pathname);
        }
      }
    } catch (e) {
      handleLogout();
      console.log(e.message);
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      const registerResult = await postUser(registrationData);
      console.log('Todoo juttui');
      console.log('handleRegister kutsuttu', registerResult);

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
