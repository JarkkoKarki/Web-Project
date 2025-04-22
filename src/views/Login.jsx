import {useState} from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';


const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  const clickHandler = () => {
    setFormToggle(!formToggle);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('src/assets/images/2147772080.jpg')" }}>
      <main className="bg-gray-100 p-10 rounded-lg shadow-md w-full max-w-md text-center text-black" >
      {formToggle ? <LoginForm /> : <RegisterForm />}
      <button className="block text-blue-500 font-bold hover:underline text-lg" onClick={clickHandler}>
        {formToggle ? 'Not a user yet?' : 'Already have an account?'}
      </button>
      </main>
    </div>

  );
};

export default Login;
