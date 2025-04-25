import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '../services/clientService';
import { getProjects, getProjectStats } from '../services/projectService';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data: clients, isLoading: isLoadingClients } = useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const { data: projectStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['projectStats'],
    queryFn: getProjectStats,
  });

  const handleProjectStatusClick = (status: string) => {
    navigate(`/projects?status=${status}`);
  };

  const calculateCompletionPercentage = () => {
    if (!projectStats || !projectStats.total) return 0;
    return Math.round((projectStats.completed / projectStats.total) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dashboard</h1>
        
        {/* Original Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Clients Card */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Clients</dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {isLoadingClients ? 'Loading...' : clients?.length || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="text-sm">
                <a href="/clients" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  View all clients
                </a>
              </div>
            </div>
          </div>

          {/* Projects Card */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Projects</dt>
                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                      {isLoadingProjects ? 'Loading...' : projects?.length || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="px-5 py-3">
              <div className="text-sm">
                <a href="/projects" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  View all projects
                </a>
              </div>
            </div>
          </div>

          {/* Completion Rate Card */}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Completion Rate</dt>
                    <dd className="text-lg font-medium text-blue-600 dark:text-blue-400">
                      {isLoadingStats ? 'Loading...' : `${completionPercentage}%`}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="px-5 py-3">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {isLoadingStats ? 'Loading...' : `${projectStats?.completed || 0} of ${projectStats?.total || 0} projects`}
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${completionPercentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Statistics */}
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
                    <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Cancelled</dt>
                      <dd className="text-lg font-medium text-yellow-600 dark:text-yellow-400">
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
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">
                        {isLoadingStats ? 'Loading...' : projectStats?.pending || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 