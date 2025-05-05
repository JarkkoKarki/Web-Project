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
      <h2 className="mb-6 text-2xl font-bold">{t('registerPage.register')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
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
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-gray-400 p-3 text-lg font-bold text-white hover:bg-gray-500"
        >
          {t('registerPage.register')}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
