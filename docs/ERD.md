# Entity Relationship Diagram (ERD)

![HELLOCLIENT ER Diagram](ER_Diagram_helloClient.png)

## Database Schema Overview

The HELLOCLIENT CRM system uses a PostgreSQL database with the following entity relationships:

```mermaid
erDiagram

    User {
        string id PK
        string email UK
        string password
        string firstName
        string lastName
        string role
        string themePreference
        datetime createdAt
    }

    Client {
        string id PK
        string name
        string email
        string phone
        string company
        string notes
        datetime createdAt
        datetime updatedAt
        string userId FK
    }

    Project {
        string id PK
        string title
        float budget
        datetime deadline
        string status
        datetime createdAt
        datetime updatedAt
        string userId FK
        string clientId FK
    }

    Interaction {
        string id PK
        datetime date
        string type
        string notes
        datetime createdAt
        datetime updatedAt
        string userId FK
        string clientId FK
        string projectId FK
    }

    Reminder {
        string id PK
        string title
        string description
        datetime dueDate
        string type
        datetime createdAt
        datetime updatedAt
        string userId FK
        string clientId FK
        string projectId FK
    }
```

## Entity Descriptions

### User
The core entity representing system users. Includes authentication details, personal information, and preferences.
- **Key Features**:
  - Theme preference support
  - Customizable dashboard preferences

### Client
Represents business clients or customers.
- **Key Features**:
  - Basic contact information
  - Company details
  - Notes for additional information
  - Associated with multiple projects and interactions

### Project
Represents client projects with associated budgets and deadlines.
- **Key Features**:
  - Budget tracking
  - Deadline management
  - Status tracking
  - Associated with clients and users

### Interaction
Records various types of client interactions.
- **Key Features**:
  - Date and time tracking
  - Type categorization (call/meeting/email)
  - Detailed notes
  - Can be associated with clients and/or projects

### Reminder
Manages various types of reminders in the system.
- **Key Features**:
  - Due date tracking
  - Can be associated with projects


## Relationships

1. **User Relationships**:
   - One-to-Many with Client (A user can manage multiple clients)
   - One-to-Many with Project (A user can create multiple projects)
   - One-to-Many with Interaction (A user can create multiple interactions)

2. **Client Relationships**:
   - Many-to-One with User (Many clients can be managed by one user)
   - One-to-Many with Project (A client can have multiple projects)
   - One-to-Many with Interaction (A client can have multiple interactions)

3. **Project Relationships**:
   - Many-to-One with User (Many projects can be managed by one user)
   - Many-to-One with Client (Many projects can belong to one client)
   - One-to-Many with Interaction (A project can have multiple interactions)

4. **Interaction Relationships**:
   - Many-to-One with User (Many interactions can be created by one user)
   - Many-to-One with Client (Many interactions can be associated with one client)
   - Many-to-One with Project (Many interactions can be associated with one project)
