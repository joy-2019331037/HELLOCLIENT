export interface Project {
  id: string;
  title: string;
  budget: number;
  deadline: string;
  status: string;
  clientId: string;
  client?: {
    id: string;
    name: string;
    email: string;
  };
} 