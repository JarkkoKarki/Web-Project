import { useUserContext } from "../hooks/contextHooks";
import useForm from "../hooks/formHooks";

const RegisterForm = () => {
  const {handleRegister} = useUserContext();

  const initValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: '',
  };

  const doRegister = async () => {
    try {
      await handleRegister(inputs);
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
          <label htmlFor="registername" className="block text-left mb-2 font-bold text-lg">Full Name</label>
          <input
              onChange={handleInputChange}
              autoComplete="name"
              type="text"
              id="registername"
              name="name"
              placeholder="Your full name"
              className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"/>
        </div>

        <div>
          <label htmlFor="registerusername" className="block text-left mb-2 font-bold text-lg">Username</label>
          <input
            onChange={handleInputChange}
            autoComplete="username"
            type="text"
            id="registerusername"
            name="username"
            placeholder="Choose a username"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"/>
        </div>

        <div>
          <label htmlFor="registeremail" className="block text-left mb-2 font-bold text-lg">Email</label>
          <input
            onChange={handleInputChange}
            autoComplete="email"
            type="email"
            id="registeremail"
            name="email"
            placeholder="you@example.com"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"/>
        </div>

        <div>
          <label htmlFor="registerpassword" className="block text-left mb-2 font-bold text-lg">Password</label>
          <input
            onChange={handleInputChange}
            autoComplete="new-password"
            type="password"
            id="registerpassword"
            name="password"
            placeholder="Enter password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"/>
        </div>

        <div>
          <label htmlFor="confirmpassword" className="block text-left mb-2 font-bold text-lg">Confirm Password</label>
          <input
            onChange={handleInputChange}
            autoComplete="new-password"
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            placeholder="Re-enter password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"/>
        </div>

        <div>
          <label htmlFor="address" className="block text-left mb-2 font-bold text-lg">Address</label>
          <input
            onChange={handleInputChange}
            autoComplete="street-address"
            type="text"
            id="address"
            name="address"
            placeholder="Your address"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"/>
        </div>

        <button type="submit" className="w-full p-3 bg-gray-400 text-white rounded-lg text-lg font-bold mt-4 hover:bg-gray-500">Register</button>

      </form>
    </>
  );
};

export default RegisterForm;
