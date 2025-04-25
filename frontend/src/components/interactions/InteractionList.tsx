import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Interaction, getInteractions, deleteInteraction } from '../../services/interactionService';
import { format } from 'date-fns';

const InteractionList: React.FC = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const data = await getInteractions();
        setInteractions(data);
      } catch (err) {
        setError('Failed to fetch interactions');
      } finally {
        setLoading(false);
      }
    };

    fetchInteractions();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this interaction?')) {
      try {
        await deleteInteraction(id);
        setInteractions(interactions.filter(interaction => interaction.id !== id));
      } catch (err) {
        setError('Failed to delete interaction');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {interactions.map((interaction) => (
            <li key={interaction.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {interaction.type}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(interaction.date), 'PPP')}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {interaction.notes}
                  </p>
                  {interaction.client && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Client: {interaction.client.name}
                    </p>
                  )}
                  {interaction.project && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Project: {interaction.project.title}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/interactions/${interaction.id}`}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/interactions/${interaction.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(interaction.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InteractionList; 