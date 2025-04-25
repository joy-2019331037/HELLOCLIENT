import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import InteractionList from '../components/interactions/InteractionList';
import InteractionForm from '../components/interactions/InteractionForm';
import InteractionDetails from '../components/interactions/InteractionDetails';

const AllInteractions: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interactions</h1>
        <Link
          to="/interactions/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Interaction
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<InteractionList />} />
        <Route path="/new" element={<InteractionForm />} />
        <Route path="/:id" element={<InteractionDetails />} />
        <Route path="/:id/edit" element={<InteractionForm />} />
      </Routes>
    </div>
  );
};

export default AllInteractions; 