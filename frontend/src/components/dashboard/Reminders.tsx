import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Reminder } from '../../services/reminderService';

interface RemindersProps {
  reminders: Reminder[];
  isLoadingReminders: boolean;
}

const Reminders: React.FC<RemindersProps> = ({
  reminders,
  isLoadingReminders
}) => {
  const navigate = useNavigate();

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Due This Week</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoadingReminders ? (
          <div className="text-gray-500 dark:text-gray-400">Loading reminders...</div>
        ) : reminders?.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No reminders for this week</div>
        ) : (
          reminders?.map((reminder: Reminder) => (
            <div
              key={reminder.id}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => reminder.project && handleProjectClick(reminder.project.id)}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dd className="text-sm text-gray-900 dark:text-white">
                        {new Date(reminder.dueDate).toLocaleDateString()}
                      </dd>
                      <dd className="text-sm text-red-500 dark:text-red-400 mt-1">
                        {reminder.description}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              {reminder.project && (
                <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700">
                  <div className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Project: </span>
                    <span className="text-gray-900 dark:text-white">{reminder.project.title}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reminders; 