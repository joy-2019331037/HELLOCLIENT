import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createClient, fetchClients } from '../services/clientService';
import { Link } from 'react-router-dom';

const Clients: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  // Fetch clients list
  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      setIsAddModalOpen(false);
      setNewClient({
        name: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newClient);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Clients</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Client
          </button>
        </div>

        {/* Clients List */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          {isLoading ? (
            <div className="p-4 text-center">Loading clients...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">Error loading clients</div>
          ) : clients && clients.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {clients.map((client) => (
                <li key={client.id}>
                  <Link
                    to={`/clients/${client.id}`}
                    className="block hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                            {client.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {client.company || 'No company'}
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {client.email}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {client.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No clients found. Add your first client!
            </div>
          )}
        </div>

        {/* Add Client Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Client</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newClient.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newClient.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newClient.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newClient.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newClient.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {createMutation.isLoading ? 'Adding...' : 'Add Client'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients; 