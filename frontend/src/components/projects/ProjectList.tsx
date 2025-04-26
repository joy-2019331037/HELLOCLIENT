import React from 'react';
import { Project, getProjects, deleteProject } from '../../services/projectService';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ProjectList: React.FC = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const statusFilter = searchParams.get('status') || 'all';

  const { data: projects = [], isLoading, error } = useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects,
    refetchOnWindowFocus: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const filteredProjects = React.useMemo(() => {
    if (statusFilter === 'all') return projects;
    return projects.filter(project => project.status === statusFilter);
  }, [projects, statusFilter]);

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', newStatus);
    }
    setSearchParams(searchParams);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in_progress':
        return 'text-green-500';
      case 'completed':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Projects</h1>
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-3 py-2 rounded border ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Link
            to="/projects/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Project
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className={`rounded-lg shadow-md p-6 ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Budget: ৳{project.budget}
            </p>
            <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
            <p className={`mb-2 ${getStatusColor(project.status)}`}>
              Status: {project.status.replace('_', ' ').toUpperCase()}
            </p>
            {project.client && (
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Client: {project.client.name}
              </p>
            )}
            <div className="flex space-x-2">
              <Link
                to={`/projects/${project.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View
              </Link>
              <Link
                to={`/projects/${project.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className={`col-span-full text-center py-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No projects found with the selected status
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList; 