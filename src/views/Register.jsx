import {useState} from 'react';
import {useNavigate} from 'react-router';
import RegisterForm from '../components/forms/RegisterForm';
import LoginForm from '../components/forms/LoginForm';

const Register = () => {
  const [formToggle, setFormToggle] = useState(false);
  const navigate = useNavigate();

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
      <div className="w-full max-w-md rounded-lg bg-gray-100 p-10 text-center text-black shadow-md">
        {formToggle ? <LoginForm /> : <RegisterForm />}
        <button
          className="block text-lg font-bold text-blue-500 hover:underline"
          onClick={clickHandler}
        >
          {formToggle ? 'Not a user yet?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Register;
