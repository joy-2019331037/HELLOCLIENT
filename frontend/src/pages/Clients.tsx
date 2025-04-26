import React, { useState, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createClient, fetchClients } from '../services/clientService';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from '../context/ThemeContext';

const Clients: React.FC = () => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    company: '',
    email: '',
  });
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const queryClient = useQueryClient();

  // Fetch clients list
  const { data: clients = [], isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  // Filter clients based on search criteria
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const nameMatch = client.name.toLowerCase().includes(filters.name.toLowerCase());
      const companyMatch = !filters.company || client.company?.toLowerCase().includes(filters.company.toLowerCase());
      const emailMatch = client.email.toLowerCase().includes(filters.email.toLowerCase());
      return nameMatch && companyMatch && emailMatch;
    });
  }, [clients, filters]);

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: (newClient) => {
      queryClient.setQueryData(['clients'], (oldClients: any) => {
        return [...(oldClients || []), newClient];
      });
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading clients</div>;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Clients</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Client
          </button>
        </div>

        {/* Filter Section */}
        <div className={`mb-6 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <h2 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Search by name"
                className={`w-full px-4 py-2 border rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Company
              </label>
              <input
                type="text"
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                placeholder="Search by company"
                className={`w-full px-4 py-2 border rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="text"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                placeholder="Search by email"
                className={`w-full px-4 py-2 border rounded-md ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          {isLoading ? (
            <div className="p-4 text-center">Loading clients...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">Error loading clients</div>
          ) : filteredClients && filteredClients.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredClients.map((client) => (
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
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} w-full max-w-md`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Add New Client
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newClient.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newClient.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newClient.phone}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border rounded-md ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newClient.company}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newClient.notes}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Client
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