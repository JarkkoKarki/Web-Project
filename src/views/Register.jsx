import React from 'react'

const Register = () => {
  return (
    <div
      className="h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('../images/2147772080.jpg')" }}
    >
      <main className="bg-gray-100 p-10 rounded-lg shadow-md w-full max-w-md text-center text-black" >
        <h2 className="mb-6 text-2xl font-bold">Register</h2>
        <form>
          <label
            htmlFor="name"
            className="block text-left mb-2 font-bold text-lg"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />

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
            placeholder="Choose a username"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />

          <label
            htmlFor="email"
            className="block text-left mb-2 font-bold text-lg"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
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
            placeholder="Enter password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />

          <label
            htmlFor="confirm-password"
            className="block text-left mb-2 font-bold text-lg"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Re-enter password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />

          <label
            htmlFor="address"
            className="block text-left mb-2 font-bold text-lg"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Your address"
            className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-lg"
          />

          <button
            type="submit"
            className="w-full p-3 bg-gray-400 text-white rounded-lg text-lg font-bold mt-4 hover:bg-gray-500"
          >
            Create Account
          </button>

          <p className="my-3 text-lg">Already have an account?</p>

          {/*TODO a -> Link to elementiks*/}
          <a
            href="../htmls/login.html"
            className="block text-blue-500 font-bold hover:underline text-lg"
          >
            Log in here
          </a>
        </form>
      </main>
    </div>
  );
}

export default Register
