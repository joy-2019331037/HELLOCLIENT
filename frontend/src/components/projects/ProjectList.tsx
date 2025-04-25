import React, { useEffect, useState } from 'react';
import { Project, getProjects, deleteProject } from '../../services/projectService';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const ProjectList: React.FC = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(project => project.id !== id));
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Projects</h1>
        <Link
          to="/projects/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`rounded-lg shadow-md p-6 ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Budget: ${project.budget}
            </p>
            <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
            <p className={`mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Status: {project.status}
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
      </div>
    </div>
  );
};

export default ProjectList; 