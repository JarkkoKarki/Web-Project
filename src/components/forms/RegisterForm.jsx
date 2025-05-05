import {useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
  const {handleRegister} = useUserContext();
  const navigate = useNavigate();

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
      <h2 className="mb-6 text-2xl font-bold">Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="registerfirstname"
            className="mb-2 block text-left text-lg font-bold"
          >
            First Name
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="given-name"
            type="text"
            id="registerfirstname"
            name="first_name"
            placeholder="Your first name"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="registerlastname"
            className="mb-2 block text-left text-lg font-bold"
          >
            Last Name
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="family-name"
            type="text"
            id="registerlastname"
            name="last_name"
            placeholder="Your last name"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="registerusername"
            className="mb-2 block text-left text-lg font-bold"
          >
            Username
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="username"
            type="text"
            id="registerusername"
            name="username"
            placeholder="Choose a username"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="registeremail"
            className="mb-2 block text-left text-lg font-bold"
          >
            Email
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="email"
            type="email"
            id="registeremail"
            name="email"
            placeholder="you@example.com"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="registerpassword"
            className="mb-2 block text-left text-lg font-bold"
          >
            Password
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="new-password"
            type="password"
            id="registerpassword"
            name="password"
            placeholder="Enter password"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="confirmpassword"
            className="mb-2 block text-left text-lg font-bold"
          >
            Confirm Password
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="new-password"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Re-enter password"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-2 block text-left text-lg font-bold"
          >
            Address
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="street-address"
            type="text"
            id="address"
            name="address"
            placeholder="Your address"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-left text-lg font-bold"
          >
            Phone Number
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="tel"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your phone number"
            className="mb-5 w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-gray-400 p-3 text-lg font-bold text-white hover:bg-gray-500"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
