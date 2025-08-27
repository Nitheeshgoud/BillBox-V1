
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

interface LoginResponse {
  token: string;
  role: string;
  username: string;
  message?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const { setToken, setRole, setUsername } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:5050/api/login",
        form
      );

      if (response.status === 200) {
        const { token, role, username } = response.data;
        setToken(token);
        setRole(role);
        setUsername(username);

        if (role === "customer") {
          navigate("/customer-dashboard");
        } else {
          navigate("/vendor-dashboard");
        }
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
        }
        .form-container {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .form-entering {
            opacity: 1;
            transform: translateY(0);
        }
        .form-exiting {
            opacity: 0;
            transform: translateY(-10px);
        }
      `}</style>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="w-full max-w-md form-container form-entering">
          <div className="bg-white/60 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-200/80">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome Back!
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
              >
                Login
              </button>
              {error && (
                <p className="text-red-500 text-center text-sm mt-2">{error}</p>
              )}
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
