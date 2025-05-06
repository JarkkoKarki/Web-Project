import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import RegisterForm from '../components/forms/RegisterForm';
import LoginForm from '../components/forms/LoginForm';
import {useTranslation} from 'react-i18next';
import backgroundImage from '../assets/images/2147772080.jpg';

const Register = () => {
  const [formToggle, setFormToggle] = useState(false);
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
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: `url(${backgroundImage})`}}
    >
      <div className="m-3 mx-auto mt-20 max-w-3xl rounded-md border border-gray-300 bg-[#0d0f0e] p-4 shadow-md">
        {formToggle ? <LoginForm /> : <RegisterForm />}
        <button
          className="mt-4 block text-lg font-bold text-blue-500 hover:underline"
          onClick={clickHandler}
        >
          {formToggle ? t('loginPage.not-user') : t('loginPage.ready-user')}
        </button>
      </div>
    </div>
  );
};

export default Register;
