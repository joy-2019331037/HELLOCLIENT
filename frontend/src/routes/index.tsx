import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';
import ClientDetail from '../components/clients/ClientDetail';
import Projects from '../pages/Projects';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectDetail from '../components/projects/ProjectDetails';
import AllInteractions from '../pages/AllInteractions';
import InteractionForm from '../components/interactions/InteractionForm';
import InteractionDetail from '../components/interactions/InteractionDetails';
import Profile from '../pages/Profile';


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id/edit" element={<ProjectForm />} />
        <Route path="/interactions" element={<AllInteractions />} />
        <Route path="/interactions/new" element={<InteractionForm />} />
        <Route path="/interactions/:id" element={<InteractionDetail />} />
        <Route path="/interactions/:id/edit" element={<InteractionForm />} />
      </Route>
    </Routes>
  );
}; 