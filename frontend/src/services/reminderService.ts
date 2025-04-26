import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: string;
  project?: {
    id: string;
    title: string;
  };
}

export const getRemindersForThisWeek = async (): Promise<Reminder[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/reminders/week`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 