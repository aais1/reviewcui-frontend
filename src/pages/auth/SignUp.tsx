import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex">
      {/* Left Side - Form */}
      <div className="flex flex-col flex-1 items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-6">Sign Up</h1>

        <div className="bg-white w-xl md:w-2xl p-8 flex-col items-center justify-center">
          {/* Full Name */}
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          {/* Email Address */}
          <label className="block text-gray-700 font-medium">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@student.cui.edu.pk"
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          {/* Password */}
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          {/* Confirm Password */}
          <label className="block text-gray-700 font-medium">
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="*******"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
          />

          {/* Show Password Checkbox */}
          <div className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              id="showPassword"
              className="cursor-pointer"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="showPassword"
              className="text-gray-700 cursor-pointer"
            >
              Show Password
            </label>
          </div>

          {/* Sign-Up Button */}
          <button className="w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-lg transition">
            Sign Up
          </button>
          <div className="h-[1px] my-4 bg-[#d3d3d3]"></div>

          {/* Login Redirect */}
          <p>
            Already have an account?{' '}
            <Link
              to="/auth/sign-in"
              className="hover:underline hover:font-semibold"
            >
              Log in here!
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex bg-[#d3d3d3] rounded-tl-2xl rounded-bl-2xl items-center justify-center h-screen flex-1">
        <img
          src="//assets.api.uizard.io/api/cdn/stream/7b63b700-42c3-436c-826a-f40b4f3a5154.png"
          alt="Sign Up"
        />
      </div>
    </div>
  );
};

export default SignUp;
