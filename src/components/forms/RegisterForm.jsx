import {useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import useForm from '../hooks/formHooks';
import {useTranslation} from 'react-i18next';

const RegisterForm = () => {
  const {handleRegister} = useUserContext();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const initValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: '',
    first_name: '',
    last_name: '',
    phone: '',
  };

  const doRegister = async () => {
    try {
      const registrationData = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
        address: inputs.address,
        first_name: inputs.first_name,
        last_name: inputs.last_name,
        phone: inputs.phone,
      };
      console.log('regData', registrationData);
      await handleRegister(registrationData);
      navigate('/login');
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <div className="w-2xl p-6">
        <h2 className="mb-3 text-2xl font-bold">
          {t('registerPage.register')}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="p-2">
            <label
              htmlFor="registerfirstname"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.first-name')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="given-name"
              type="text"
              id="registerfirstname"
              name="first_name"
              placeholder={t('registerPage.your-f')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="p-2">
            <label
              htmlFor="registerlastname"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.last-name')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="family-name"
              type="text"
              id="registerlastname"
              name="last_name"
              placeholder={t('registerPage.your-l')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="p-2">
            <label
              htmlFor="registerusername"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.username')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="username"
              type="text"
              id="registerusername"
              name="username"
              placeholder={t('registerPage.your-u')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="p-2">
            <label
              htmlFor="registeremail"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.email')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="email"
              type="email"
              id="registeremail"
              name="email"
              placeholder={t('registerPage.your-e')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="p-2">
            <label
              htmlFor="registerpassword"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.password')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="new-password"
              type="password"
              id="registerpassword"
              name="password"
              placeholder={t('registerPage.your-p')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="p-2">
            <label
              htmlFor="confirmpassword"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.password-confirm')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="new-password"
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder={t('registerPage.your-rp')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="p-2">
            <label
              htmlFor="address"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.address')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="street-address"
              type="text"
              id="address"
              name="address"
              placeholder={t('registerPage.your-a')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="p-2">
            <label
              htmlFor="phone"
              className="mb-2 block text-left text-lg font-bold"
            >
              {t('registerPage.phone')}
            </label>
            <input
              onChange={handleInputChange}
              autoComplete="tel"
              type="tel"
              id="phone"
              name="phone"
              placeholder={t('registerPage.your-phone')}
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          <div className="col-span-1 flex justify-center md:col-span-2">
            <button
              type="submit"
              className="transform rounded bg-yellow-400 px-6 py-3 align-middle text-lg font-semibold text-black transition-transform hover:scale-105 hover:bg-green-500"
            >
              {t('registerPage.register')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
