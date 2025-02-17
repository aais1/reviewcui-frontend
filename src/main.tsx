import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Search from './pages/Search';
import FacultyProfile from './pages/FacultyProfile';
import VerifyOTP from './pages/auth/verify-otp';
import { AuthContextProvider } from './contexts/AuthContext';
import NotFound from './components/ErrorBoundaries/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="auth/sign-in" element={<SignIn />} />
      <Route path="auth/sign-up" element={<SignUp />} />
      <Route path="auth/verify-otp" element={<VerifyOTP />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/faculty-profile/:id" element={<FacultyProfile />} />
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </>
  )
);

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
