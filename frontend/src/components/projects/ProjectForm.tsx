import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Project, createProject, getProject, updateProject } from '../../services/projectService';
import { fetchClients } from '../../services/clientService';
import { useTheme } from '../../context/ThemeContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Client {
  id: string;
  name: string;
}

const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const { data: project } = useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProject(id!),
    enabled: !!id,
  });

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    budget: 0,
    deadline: '',
    status: '',
    clientId: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        budget: project.budget,
        deadline: project.deadline,
        status: project.status,
        clientId: project.clientId,
      });
    }
  }, [project]);

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects');
    },
    onError: () => {
      setError('Failed to create project');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects');
    },
    onError: () => {
      setError('Failed to update project');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      deadline: new Date(formData.deadline).toISOString(),
    };

    if (id) {
      updateMutation.mutate({ id, data: submissionData });
    } else {
      createMutation.mutate(submissionData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' ? parseFloat(value) : value,
    }));
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Project' : 'New Project'}</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'text-gray-700 border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:shadow-outline`}
            required
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="budget">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'text-gray-700 border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:shadow-outline`}
            required
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="deadline">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'text-gray-700 border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:shadow-outline`}
            required
          />
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'text-gray-700 border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:shadow-outline`}
            required
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-4">
          <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="clientId">
            Client
          </label>
          <select
            id="clientId"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'text-gray-700 border-gray-300 focus:border-blue-500'
            } focus:outline-none focus:shadow-outline`}
            required
          >
            <option value="">Select Client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {id ? 'Update' : 'Create'} Project
          </button>
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 