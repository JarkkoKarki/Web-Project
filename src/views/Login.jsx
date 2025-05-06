import {useState} from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import {useNavigate} from 'react-router';
import {useTranslation} from 'react-i18next';

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
      className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: "url('src/assets/images/2147772080.jpg')"}}
    >
      <div className="mx-auto mt-20 max-w-md rounded-md border border-gray-300 bg-[#0d0f0e] p-4 shadow-md">
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

export default Login;
