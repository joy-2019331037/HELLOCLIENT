import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchClients } from '../services/clientService';
import { getProjects, getProjectStats } from '../services/projectService';
import { getRemindersForThisWeek } from '../services/reminderService';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import ProjectStatistics from '../components/dashboard/ProjectStatistics';
import Reminders from '../components/dashboard/Reminders';

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

  const { data: reminders, isLoading: isLoadingReminders } = useQuery({
    queryKey: ['reminders'],
    queryFn: getRemindersForThisWeek,
  });

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const calculateCompletionPercentage = () => {
    if (!projectStats || !projectStats.total) return 0;
    return Math.round((projectStats.completed / projectStats.total) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardMetrics
          clients={clients || []}
          isLoadingClients={isLoadingClients}
          projects={projects || []}
          isLoadingProjects={isLoadingProjects}
          projectStats={projectStats || { completed: 0, total: 0 }}
          isLoadingStats={isLoadingStats}
          completionPercentage={completionPercentage}
        />
        
        <ProjectStatistics
          projectStats={projectStats || { total: 0, in_progress: 0, completed: 0, cancelled: 0, pending: 0 }}
          isLoadingStats={isLoadingStats}
        />

        <Reminders
          reminders={reminders || []}
          isLoadingReminders={isLoadingReminders}
        />
      </div>
    </div>
  );
};

export default Dashboard; 