# HELLOCLIENT

HELLOCLIENT is a CRM (Customer Relationship Management) web application designed to help freelancers manage their clients, projects, and interactions efficiently.

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
   cd frontend
   npm install
   ```

4. Set up environment variables:
   - Create `.env` files in both backend and frontend directories

5. Start the development servers:
   - Backend: 
   ```bash
   cd backend && npm run start:dev
   ```
   Wait for the message : **`Backend server is running on http://localhost:8000`**
   - Frontend: 
   ```bash
   cd frontend && npm start
   ```
   The frontend will open automatically at **http://localhost:3000**

### Environment Variables

#### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Backend server port (default: 8000)

#### Frontend (.env)
- `REACT_APP_API_URL`: Frontend API URL (default: http://localhost:3000/api)


### Example .env
#### Backend

```dotenv
DATABASE_URL=postgresql://username:password@localhost:5433/database_name
JWT_SECRET=jwt_secret_key
PORT=8000
FRONTEND_URL=http://localhost:3000
```

#### Frontend 
```dotenv
REACT_APP_API_URL=http://localhost:3000/api
```


### Database Setup

1. Create a PostgreSQL database:
   ```bash
   createdb database_name
   ```

2. Set up database URL in the backend `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5433/database_name"
   ```

3. Run database migrations:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

Since this is a fresh installation:

   - The database will be empty
   - A new account must be registered at http://localhost:3000/register.
   - After registration, users can log in and start using the application.

## Summary of Approach and Decisions

### Database Design
- **PostgreSQL**: Chosen for its reliability and support for complex queries

### Backend Architecture
- **NestJS Framework**: Chosen for its modular architecture and TypeScript support
- **Prisma ORM**: Selected for type-safe database operations and efficient query building
- **JWT Authentication**: Implemented for secure user authentication
- **Controller-Service Pattern**: Used for clean separation and maintainable code

### Frontend Architecture
- **React with TypeScript**: Ensures type safety and better developer experience
- **Tailwind CSS**: Provides utility-first styling for rapid development
- **Component-based Design**: Promotes code reusability and maintainability

### Theme Implementation
- **User Preference Storage**: Theme settings stored in database
- **Smooth Transitions**: Enhances user experience

### Security Implementation
- **JWT Tokens**: Secure authentication with JWT token
- **Password Hashing**: Using bcrypt for secure password storage
- **Input Validation**: Ensures data integrity and security




## Documentation

- [Entity Relationship Diagram](docs/ERD.md)
- [Sample Test User](docs/SAMPLE_TEST_USER.md)
- [Postman Collection](https://www.postman.com/sourav-joy/workspace/api-workspace-for-joy/collection/28240594-bd9ba811-6d3d-4bbf-ab52-ac39c2c4ca31?action=share&creator=28240594)



## Testing

For testing the application, please refer to the [Sample Test User](docs/SAMPLE_TEST_USER.md) documentation. You can also use the provided [Postman Collection](https://www.postman.com/sourav-joy/workspace/api-workspace-for-joy/collection/28240594-bd9ba811-6d3d-4bbf-ab52-ac39c2c4ca31?action=share&creator=28240594) to test the API endpoints.

