import {useAuthentication} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    console.log('login funktiota kutsuttu');
    console.log(inputs);
    // TODO: add login functionalities here
    await postLogin(inputs);
    navigate('/');
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  console.log(inputs);
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="loginuser" className="block text-left mb-2 font-bold text-lg">Username</label>
          <input
              onChange={handleInputChange}
              type="text"
              id="loginuser"
              name="username"
              placeholder="Username"
              autoComplete="username"
              className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"/>
        </div>

        <div>
          <label htmlFor="loginpassword" className="block text-left mb-2 font-bold text-lg">Password</label>
          <input
            onChange={handleInputChange}
            type="password"
            id="loginpassword"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />
        </div>
        <button type="submit" className="w-full p-3 bg-gray-400 text-white rounded-lg text-lg font-bold mt-4 hover:bg-gray-500">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
