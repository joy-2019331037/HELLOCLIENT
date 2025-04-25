import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <img src={logo} alt="HELLOCLIENT Logo" className="h-10 w-auto" />
              <span className="ml-2 text-2xl font-bold text-gray-800">HELLOCLIENT</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your Friendly</span>
            <span className="block text-indigo-600">CRM Partner</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Streamline your customer relationships with our intuitive and powerful CRM solution.
            Manage clients, track interactions, and grow your business effortlessly.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-medium text-indigo-600">Smart Client Management</h3>
              <p className="mt-2 text-gray-600">
                Organize and manage your clients efficiently with our intuitive interface.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-medium text-indigo-600">Real-time Analytics</h3>
              <p className="mt-2 text-gray-600">
                Get insights into your clients interactions with powerful analytics tools.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-medium text-indigo-600">Seamless Integration</h3>
              <p className="mt-2 text-gray-600">
                Connect with your favorite tools and services for a unified experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">Join thousands of satisfied clients today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 