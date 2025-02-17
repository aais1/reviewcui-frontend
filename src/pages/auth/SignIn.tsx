import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const errorMessage = searchParams.get('error');

    if (errorMessage) {
      toast.error(errorMessage);

      // Remove error from query params after toast is displayed
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('error');
      setSearchParams(newParams);
    }
  }, []); // ✅ Runs after initial render

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(email, password);

    try {
      const response = await fetch('http://localhost:3000/auth/sign-in', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful! Redirecting...');
        setUser(data.user);
        setTimeout(() => navigate('/'), 2000);
      } else {
        toast.error(data.message || 'Invalid email or password');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex">
      <Toaster />
      <div className="hidden md:flex bg-[#d3d3d3] rounded-tr-2xl rounded-br-2xl items-center justify-center h-screen flex-1">
        <img
          src="//assets.api.uizard.io/api/cdn/stream/7b63b700-42c3-436c-826a-f40b4f3a5154.png"
          alt="Login"
        />
      </div>
      <div className="flex flex-col flex-1 items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-6">Log in</h1>

        <form
          onSubmit={handleLogin}
          className="bg-white w-xl md:w-2xl p-8 flex-col items-center justify-center"
        >
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
            className="w-full px-4 py-3 mt-2 mb-6 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-lg transition"
          >
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
        </form>
      </div>
    </div>
  );
};

export default SignIn;
