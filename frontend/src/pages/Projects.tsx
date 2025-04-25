import React from 'react';
import ProjectList from '../components/projects/ProjectList';
import { useTheme } from '../context/ThemeContext';

const Projects: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ProjectList />
    </div>
  );
};

export default Projects; 