import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../components/hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
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
    try {
      localStorage.removeItem('token');
      setUser(null);
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

        setUser(userResponse.user);
        console.log('location', location);
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
      value={{user, handleLogin, handleLogout, handleAutoLogin, handleRegister}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
