import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

interface AuthPageProps {
  isLogin?: boolean;
  children: React.ReactNode;
}

const AuthPage: React.FC<AuthPageProps> = ({ isLogin = true, children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image and Details */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="flex flex-col justify-center items-center w-full px-12">
          <img src={logo} alt="HELLOCLIENT Logo" className="h-24 w-auto mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">HELLOCLIENT</h1>
          <p className="text-xl text-indigo-100 mb-8 text-center">
            Your Friendly CRM Partner
          </p>
          <div className="space-y-6 text-indigo-100">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Smart Contact Management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Seamless Integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-12">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="mt-2 text-gray-600">
              {isLogin
                ? 'Sign in to your account to continue'
                : 'Join HELLOCLIENT to manage your customer relationships'}
            </p>
          </div>

          {children}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <Link
                to={isLogin ? '/register' : '/login'}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 