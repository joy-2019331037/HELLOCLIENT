# HELLOCLIENT

HELLOCLIENT is a CRM (Customer Relationship Management) web application designed to help businesses manage their clients, projects, and interactions efficiently.

## Features

- **User Management**: Secure authentication and access control
- **Client Management**: Store and manage client information
- **Project Tracking**: Create and monitor projects with budgets and deadlines
- **Dashboard**: Personalized view of important information and metrics

## Tech Stack

### Backend
- NestJS 
- Prisma ORM
- PostgreSQL
- JWT Authentication
- TypeScript

### Frontend
- React.js with TypeScript
- Tailwind CSS
- Responsive layout

## Project Structure

```
helloclient/
├── backend/           # Backend server code
│   ├── prisma/       # Database schema and migrations
│   ├── src/          # Server source code
│   └── package.json  # Backend dependencies
│
└── frontend/         # Frontend React application
    ├── src/          # React source code
    └── package.json  # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joy-2019331037/helloclient.git
   cd helloclient
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create `.env` files in both backend and frontend directories

5. Start the development servers:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm start`

## Environment Variables

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Backend server port (default: 5000)
