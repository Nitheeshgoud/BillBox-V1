

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

interface RegisterResponse {
  token: string;
  role: string;
  message?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const { setToken, setRole, setUsername } = useAuth();

  const [view, setView] = useState<'signup' | 'login'>('signup');
  const [isExiting, setIsExiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    username: '',
    role: '',
    email: '',
    password: '',
  });

  const switchView = (newView: 'signup' | 'login') => {
    if (view === newView) return;
    setIsExiting(true);
    setTimeout(() => {
      setView(newView);
      setIsExiting(false);
    }, 300);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
      const response = await axios.post<RegisterResponse>(
        `${apiUrl}/api/register`,
        form
      );
      if (response.status === 201) {
        const { token, role } = response.data;
        setToken(token);
        setRole(role);
        setUsername(form.username);
        navigate(role === 'customer' ? '/customer-dashboard' : '/vendor/registration');
      }
    } catch (error: any) {
      console.error('Error registering user', error.response?.data || error.message);
      setError(error.response?.data?.error || error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .form-container { transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out; }
        .form-entering { opacity: 1; transform: translateY(0); }
        .form-exiting { opacity: 0; transform: translateY(-10px); }
      `}</style>
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900">
        <div className="mb-8">
          <a href="#" className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">BillBox</span>
          </a>
        </div>

        {/* Signup Form */}
        <div
          className={cn(
            'form-container w-full max-w-md',
            view === 'signup' && !isExiting && 'form-entering',
            view !== 'signup' || isExiting ? 'form-exiting' : '',
            view !== 'signup' && 'hidden'
          )}
        >
          <div className="bg-white/95 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Create an Account
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Join BillBox to start managing your bills smarter.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                  placeholder="yourusername"
                />
              </div>
              <div>
                <label htmlFor="signup-role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="signup-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                >
                  <option value="" disabled>-- Select Role --</option>
                  <option value="vendor">Vendor</option>
                  <option value="customer">Customer</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
              {error && (
                <p className="text-red-500 text-center text-sm mt-2">{error}</p>
              )}
            </form>
            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
