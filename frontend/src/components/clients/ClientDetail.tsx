import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClient, updateClient, deleteClient } from '../../services/clientService';

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const { data: client, isLoading, error } = useQuery({
    queryKey: ['client', id],
    queryFn: () => fetchClient(id!),
    onSuccess: (data) => {
      setEditedClient({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || '',
        notes: data.notes || '',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: typeof editedClient) => updateClient(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client', id] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteClient(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      navigate('/clients');
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (client) {
      setEditedClient({
        name: client.name,
        email: client.email,
        phone: client.phone,
        company: client.company || '',
        notes: client.notes || '',
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(editedClient);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedClient(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (window.confirm(
      'Are you sure you want to delete this client? This action will also delete all projects and interactions associated with this client. This action cannot be undone.'
    )) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading client details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">Error loading client details</div>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Client not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/clients')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Clients
          </button>
          <div className="space-x-2">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Client
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Client
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={updateMutation.isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Client Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Personal details and contact information.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSave}>
              <dl>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editedClient.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      client.name
                    )}
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editedClient.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      client.email
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editedClient.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      client.phone
                    )}
                  </dd>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Company
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={editedClient.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      client.company || 'Not specified'
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Notes
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {isEditing ? (
                      <textarea
                        name="notes"
                        value={editedClient.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      client.notes || 'No notes available'
                    )}
                  </dd>
                </div>
              </dl>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail; 