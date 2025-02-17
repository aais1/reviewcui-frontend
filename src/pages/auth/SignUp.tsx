import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match!');
    }

    try {
      const response = await fetch('http://localhost:3000/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created! Redirecting...');
        setTimeout(() => navigate('/auth/sign-in'), 2000);
      } else {
        toast.error(data.message || 'Failed to create account');
      }
    } catch (error) {
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex">
      <Toaster />
      <div className="flex flex-col flex-1 items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-6">Register</h1>

        <form
          onSubmit={handleSignUp}
          className="bg-white w-xl md:w-2xl p-8 flex-col items-center justify-center"
        >
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />

          <label className="block text-gray-700 font-medium">
            Enter email address
          </label>
          <input
            type="email"
            placeholder="example@student.cui.edu.pk"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />

          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />

          <label className="block text-gray-700 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="*******"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 mt-2 mb-6 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-lg transition"
          >
            Sign Up
          </button>
          <div className="h-[1px] my-4 bg-[#d3d3d3]"></div>
          <p>
            Already have an account?{' '}
            <Link
              to="/auth/sign-in"
              className="hover:underline hover:font-semibold"
            >
              Sign In Here!
            </Link>
          </p>
        </form>
      </div>

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
