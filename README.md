# HELLOCLIENT

HELLOCLIENT is a CRM (Customer Relationship Management) web application designed to help businesses manage their clients, projects, and interactions efficiently.

## Features

- **User Management**: Secure user authentication
- **Client Management**: Store and manage client information
- **Project Tracking**: Create and monitor projects with budgets and deadlines
- **Dashboard**: Personalized view of important information and metrics
- **Theme Support**: Light and dark mode with user preference

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
├── frontend/         # Frontend React application
│   ├── src/          # React source code
│   └── package.json  # Frontend dependencies
│
└── docs/             # Documentation
    ├── ERD.md
    ├── SAMPLE_TEST_USER.md
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
   - Backend: `cd backend && npm run start:dev`
   - Frontend: `cd frontend && npm start`

## Environment Variables

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Backend server port (default: 8000)

### Frontend (.env)
- `REACT_APP_API_URL`: Frontend API URL (default: http://localhost:3000)



## Summary of Approach and Decisions

### Database Design
- **PostgreSQL**: Chosen for its reliability and support for complex queries

### Backend Architecture
- **NestJS Framework**: Chosen for its modular architecture and TypeScript support
- **Prisma ORM**: Selected for type-safe database operations and efficient query building
- **JWT Authentication**: Implemented for secure user authentication and session management
- **Controller-Service Pattern**: Used for clean separation of concerns and maintainable code

### Frontend Architecture
- **React with TypeScript**: Ensures type safety and better developer experience
- **Tailwind CSS**: Provides utility-first styling for rapid development
- **Context API**: Manages global state including theme preferences
- **Component-based Design**: Promotes code reusability and maintainability

### Theme Implementation
- **User Preference Storage**: Theme settings stored in database
- **System-wide Context**: Manages theme state across application
- **CSS Variables**: Enables dynamic theming
- **Smooth Transitions**: Enhances user experience

### Security Implementation
- **JWT with Refresh Tokens**: Secure authentication with token rotation
- **Password Hashing**: Using bcrypt for secure password storage
- **Input Validation**: Ensures data integrity and security




## Documentation

- [Entity Relationship Diagram](docs/ERD.md)
- [Sample Test User](docs/SAMPLE_TEST_USER.md)
- [Postman Collection](https://www.postman.com/sourav-joy/workspace/api-workspace-for-joy/collection/28240594-bd9ba811-6d3d-4bbf-ab52-ac39c2c4ca31?action=share&creator=28240594)



## Testing

For testing the application, please refer to the [Sample Test User](docs/SAMPLE_TEST_USER.md) documentation. You can also use the provided [Postman Collection](https://www.postman.com/sourav-joy/workspace/api-workspace-for-joy/collection/28240594-bd9ba811-6d3d-4bbf-ab52-ac39c2c4ca31?action=share&creator=28240594) to test the API endpoints.

