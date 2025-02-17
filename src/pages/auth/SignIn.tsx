import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex bg-[#d3d3d3] rounded-tr-2xl rounded-br-2xl items-center justify-center h-screen flex-1">
        <img
          src="	//assets.api.uizard.io/api/cdn/stream/7b63b700-42c3-436c-826a-f40b4f3a5154.png"
          alt=""
        />
      </div>
      <div className="flex flex-col flex-1 items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-6">Log in</h1>

        <div className="bg-white w-xl md:w-2xl p-8 flex-col items-center justify-center">
          <label className="block text-gray-700 font-medium">
            Enter email address
          </label>
          <input
            type="email"
            placeholder="example@student.cui.edu.pk"
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            placeholder="*******"
            className="w-full px-4 py-3 mt-2 mb-6 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          <button className="w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-lg  transition">
            Sign In
          </button>
          <div className="h-[1px] my-4 bg-[#d3d3d3]"></div>
          <p>
            New Here?{' '}
            <Link
              to="/auth/sign-up"
              className="hover:underline hover:font-semibold"
            >
              Register Here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
