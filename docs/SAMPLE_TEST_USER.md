# Sample Test Users and Signup Flow

## Pre-configured Test Users

The system comes with the following test user for demonstration purposes:

###  User
```
First Name : Test
Last Name : User
Email: user@gmail.com
Password: user123
```


## Signup Flow

### Step 1: Registration
1. Navigate to the signup page
2. Fill in the required information:
   - First Name
   - Last Name
   - Email (must be unique)
   - Password (minimum 6 characters)

### Step 2: First Login
1. After registration, log in with your credentials


## Dashboard Access
1. After logging in, user will be taken to dashboard
2. User can now view:
   - Total no of client
   - Total no of projects
   - Project summary by status
   - Reminders for projects due this week


## Manage Clients 
1. From the clients tab, user can now manage clients
2. User can:
   - create, delete, update or view a specific client
   - search for clients by name or company or email

## Manage Projects & Interactions 
1. Similarly, user can manage (all CRUD operations) projects & interactions from the respective tabs
2. Additionally, user can:
   - search for projects by status
   - log interactions related to particular client or project

## Theme Preference

The system supports two theme modes:
1. **Light Mode** (Default)
2. **Dark Mode**

Users can switch between themes at any time.

## Profile

User can view personal information from the profile section


## Sample Test Data

### Client
```json
{
    "name": "Sample Client",
    "email": "client@example.com",
    "phone": "+1234567890",
    "company": "Sample Company"
}
```

### Project
```json
{
    "title": "Sample Project",
    "budget": 50000,
    "deadline": "2024-12-31T00:00:00Z",
    "status": "active",
    "clientId": "<client-id>"
}
```

### Interaction
```json
{
    "date": "2024-04-27T10:00:00Z",
    "type": "meeting",
    "notes": "Initial project discussion",
    "clientId": "<client-id>",
    "projectId": "<project-id>"
}
```

You can also use the provided [Postman Collection](https://www.postman.com/sourav-joy/workspace/api-workspace-for-joy/collection/28240594-bd9ba811-6d3d-4bbf-ab52-ac39c2c4ca31?action=share&creator=28240594) to test the API endpoints.

## Testing Steps

1. Register the test user
2. Login to get the JWT token
3. Create a client
4. Create a project for the client
5. Add an interaction
6. View the dashboard to see all created items 