import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';
import {useTranslation} from 'react-i18next';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const {t} = useTranslation();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <div className="p-12">
        <h2 className="mb-6 text-center text-2xl font-bold">
          {t('loginPage.login')}
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="loginuser"
              className="mb-3 block text-left text-lg font-bold"
            >
              {t('loginPage.username')}
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              id="loginuser"
              name="username"
              placeholder={t('loginPage.username')}
              autoComplete="username"
              className="mb-3 w-full rounded-lg border border-gray-300 p-3 text-lg"
            />
          </div>

          <div>
            <label
              htmlFor="loginpassword"
              className="mb-3 block text-left text-lg font-bold"
            >
              {t('loginPage.password')}
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              id="loginpassword"
              name="password"
              placeholder={t('loginPage.password')}
              autoComplete="current-password"
              className="mb-3 w-full rounded-lg border border-gray-300 p-3 text-lg"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="transform rounded bg-yellow-400 px-6 py-3 align-middle text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-green-500"
            >
              {t('loginPage.login')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
