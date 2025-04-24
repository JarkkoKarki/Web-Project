import {createContext} from 'react';
import {useAuthentication, useUser} from '../components/hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';
import useLocalStorage from '../components/hooks/useLocalStorage';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useLocalStorage('user', {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  };

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
  const {postLogin} = useAuthentication();
  const {getUserByToken, postUser} = useUser();
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogin = async (credentials) => {
    const loginResult = await postLogin(credentials);
    localStorage.setItem('token', loginResult.token);
    setUser(loginResult.user);
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      setIsLoggedIn(false);
      navigate('/');

    } catch (e) {
      console.log(e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {

      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await getUserByToken(token);
        setUser(userResponse);
        setIsLoggedIn(true);
        // console.log('location', location);
        navigate(location.pathname);
      }
    } catch (e) {
      handleLogout();
      console.log(e.message);
    }
  };

  const handleRegister = async (registrationData) => {
    try {
      const registerResult = await postUser(registrationData);
      console.log("Todoo juttui");
      console.log("handleRegister kutsuttu", registerResult);

      navigate('/');
    } catch (e) {
      console.error('Registration failed:', e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, updateUser, isLoggedIn, handleLogin, handleLogout, handleAutoLogin, handleRegister}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
