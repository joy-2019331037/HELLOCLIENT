import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/project';

interface ProjectStatisticsProps {
  projectStats: {
    total: number;
    in_progress: number;
    completed: number;
    cancelled: number;
    pending: number;
  };
  isLoadingStats: boolean;
}

const ProjectStatistics: React.FC<ProjectStatisticsProps> = ({
  projectStats,
  isLoadingStats
}) => {
  const navigate = useNavigate();

  const handleProjectStatusClick = (status: string) => {
    navigate(`/projects?status=${status}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Statistics</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Projects Card */}
        <div 
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => handleProjectStatusClick('in_progress')}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">In Progress</dt>
                  <dd className="text-lg font-medium text-green-600 dark:text-green-400">
                    {isLoadingStats ? 'Loading...' : projectStats?.in_progress || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Projects Card */}
        <div 
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => handleProjectStatusClick('completed')}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Completed</dt>
                  <dd className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {isLoadingStats ? 'Loading...' : projectStats?.completed || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Cancelled Projects Card */}
        <div 
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => handleProjectStatusClick('cancelled')}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Cancelled</dt>
                  <dd className="text-lg font-medium text-red-600 dark:text-red-400">
                    {isLoadingStats ? 'Loading...' : projectStats?.cancelled || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Projects Card */}
        <div 
          className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => handleProjectStatusClick('pending')}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending</dt>
                  <dd className="text-lg font-medium text-yellow-600 dark:text-orange-400">
                    {isLoadingStats ? 'Loading...' : projectStats?.pending || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatistics; 