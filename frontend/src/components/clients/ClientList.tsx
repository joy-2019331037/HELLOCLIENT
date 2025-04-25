import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { fetchClients, deleteClient } from '../../services/clientService';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
}

const ClientList: React.FC = () => {
  const { data: clients, isLoading, error, refetch } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(id);
        refetch();
      } catch (error) {
        console.error('Failed to delete client:', error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading clients</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link
          to="/clients/new"
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Client
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients?.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/clients/${client.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {client.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/clients/${client.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5 inline" />
                  </Link>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList; 