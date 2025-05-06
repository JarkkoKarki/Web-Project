import {useState} from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import {useNavigate} from 'react-router';
import {useTranslation} from 'react-i18next';
import backgroundImage from '../assets/images/2147772080.jpg';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const clickHandler = () => {
    setFormToggle(!formToggle);
    if (formToggle) {
      navigate('/registration');
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      className="flex h-screen flex-col items-center bg-cover bg-center bg-no-repeat md:justify-center"
      style={{backgroundImage: `url(${backgroundImage})`}}
    >
      <div className="mt-10 flex w-4/5 flex-col rounded-md border border-gray-300 bg-[#0d0f0e] p-4 shadow-md md:mt-0 md:max-w-md">
        {formToggle ? <LoginForm /> : <RegisterForm />}
        <button
          className="mt-4 block self-start text-lg font-bold text-blue-500 hover:underline"
          onClick={clickHandler}
        >
          {formToggle ? t('loginPage.not-user') : t('loginPage.ready-user')}
        </button>
      </div>
    </div>
  );
};

export default Login;
