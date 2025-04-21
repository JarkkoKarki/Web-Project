import React from 'react';

const Login = () => {
  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('src/assets/images/2147772080.jpg')" }}
    >
      <main className="bg-gray-100 p-10 rounded-lg shadow-md w-full max-w-md text-center text-black" >
        <h2 className="mb-6 text-2xl font-bold">Login</h2>
        <form>
          <label
            htmlFor="username"
            className="block text-left mb-2 font-bold text-lg"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />

          <label
            htmlFor="password"
            className="block text-left mb-2 font-bold text-lg"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />

          <p className="my-3 text-lg">Not a user yet?</p>
          <p>
            {/*TODO a -> Link to elementiks*/}
            <a
              href="/register"
              className="block text-blue-500 font-bold hover:underline text-lg">
              Register here
              </a>
          </p>

          <button
            type="submit"
            className="w-full p-3 bg-gray-400 text-white rounded-lg text-lg font-bold mt-4 hover:bg-gray-500"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
