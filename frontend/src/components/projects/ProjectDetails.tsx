import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project, getProject, deleteProject } from '../../services/projectService';
import { useTheme } from '../../context/ThemeContext';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const data = await getProject(id);
          setProject(data);
        }
      } catch (err) {
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        if (id) {
          await deleteProject(id);
          navigate('/projects');
        }
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!project) return <div className="text-center">Project not found</div>;

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className={`max-w-2xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/projects/${id}/edit`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Budget</h2>
            <p className="text-lg">${project.budget}</p>
          </div>

          <div>
            <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Deadline</h2>
            <p className="text-lg">{new Date(project.deadline).toLocaleDateString()}</p>
          </div>

          <div>
            <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Status</h2>
            <p className="text-lg capitalize">{project.status.replace('_', ' ')}</p>
          </div>

          {project.client && (
            <div>
              <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Client</h2>
              <div className="mt-2">
                <p className="text-lg">{project.client.name}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{project.client.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/projects')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails; 