[Public API Documentation]: https://awilliamsrrc.github.io/BackEnd_A05/api-docs/index.html

# Employee Directory and Branch Management API
Project Overview
Employee Directory and Branch Management API are RESTful APIs using Node.js, Express, and TypeScript to manage the employee directory and branch locations of PiXELL-River Financial.This API allows users to interact with directories, such as creating, updating, deleting, and retrieving directorires. It supports basic firestore authentication and provides endpoints to manage directory information.

Key Features:
.env for firestore authentication : Users can securely sign in and access firesotre directory data.

Directory Management: CRUD operations (Create, Read, Update, Delete) on directory.

Swagger Documentation: Comprehensive API documentation is available for developers to understand how to interact with the API.

This API is useful for:

It's customized for basically creating  databases for branches and employess and linking them together.

Integrating directory management into third-party applications, such as firesotre.

# Installation Instructions
##Step 1: Clone the repository
### First, clone the project to your local machine:

git clone https://github.com/awilliamsRRC/BackEnd_A05.git

# Step 2: Install dependencies

##Navigate to the project folder:

**cd EMPLOYEE-DIRECTORY_M03**

# Install the required packages by running:

**npm install**

# Step 3: Set up environment variables

##Create a .env file in the root of your project. Add the following environment variables:

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# Step 4: Run the API Locally
## To start the application, run:

**npm start**
The application will be running on http://localhost:3000.

# 1. Example Requests and Responses for Branches API
## Endpoint: Get All Branches
### Method: GET

**URL: /api/v1/branches**

**Request Example (No body required):**

**typescript**

fetch("http://localhost:3000/api/v1/branches", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
Response Example (Status 200 OK):

**json**

[
    {
        "id": "1",
        "name": "Branch A",
        "address": "123 Main St, Cityville, State, 12345",
        "phone": "(555) 123-4567"
    },
    {
        "id": "2",
        "name": "Branch B",
        "address": "456 Elm St, Townsville, State, 67890",
        "phone": "(555) 987-6543"
    }
]
# Endpoint: Create a New Branch
## Method: POST

**URL: /api/v1/branches**

Request Example (Body):

**typescript**

const newBranch = {
    name: "Branch C",
    address: "789 Oak St, Villageville, State, 11223",
    phone: "(555) 111-2233",
};

fetch("http://localhost:3000/api/v1/branches", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
    body: JSON.stringify(newBranch),
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
Response Example (Status 201 Created):

**json**

{
    "id": "3",
    "name": "Branch C",
    "address": "789 Oak St, Villageville, State, 11223",
    "phone": "(555) 111-2233"
}
# Endpoint: Update a Branch
## Method: PUT

URL: /api/v1/branches/{id}

Request Example (Body):

**typescript**

const updatedBranch = {
    name: "Updated Branch A",
    address: "123 Main St, Cityville, State, 54321",
    phone: "(555) 123-7654",
};

fetch("http://localhost:3000/api/v1/branches/1", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
    body: JSON.stringify(updatedBranch),
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
Response Example (Status 200 OK):

**json**

{
    "id": "1",
    "name": "Updated Branch A",
    "address": "123 Main St, Cityville, State, 54321",
    "phone": "(555) 123-7654"
}
# Endpoint: Delete a Branch
## Method: DELETE

URL: /api/v1/branches/{id}

Request Example (No body required):

**typescript**

fetch("http://localhost:3000/api/v1/branches/1", {
    method: "DELETE",
    headers: {
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
})
    .then((response) => {
        if (response.ok) {
            console.log("Branch deleted successfully");
        } else {
            console.error("Error deleting branch");
        }
    })
    .catch((error) => console.error("Error:", error));
Response Example (Status 204 No Content):

No response body on success.

#2. Example Requests and Responses for Employees API

## Endpoint: Get All Employees
### Method: GET

URL: /api/v1/employees

Request Example (No body required):

**typescript**

fetch("http://localhost:3000/api/v1/employees", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
Response Example (Status 200 OK):

**json**

[
    {
        "id": "1",
        "name": "John Doe",
        "position": "Manager",
        "department": "Sales",
        "email": "johndoe@example.com",
        "phone": "(555) 123-4567",
        "branchId": 1
    },
    {
        "id": "2",
        "name": "Jane Smith",
        "position": "Engineer",
        "department": "IT",
        "email": "janesmith@example.com",
        "phone": "(555) 987-6543",
        "branchId": 2
    }
]

# Endpoint: Create a New Employee
## Method: POST

URL: /api/v1/employees

Request Example (Body):

**typescript**

const newEmployee = {
    name: "Alice Johnson",
    position: "Designer",
    department: "Marketing",
    email: "alice.johnson@example.com",
    phone: "(555) 111-2233",
    branchId: 1,
};

fetch("http://localhost:3000/api/v1/employees", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
    body: JSON.stringify(newEmployee),
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
Response Example (Status 201 Created):

**json**

{
    "id": "3",
    "name": "Alice Johnson",
    "position": "Designer",
    "department": "Marketing",
    "email": "alice.johnson@example.com",
    "phone": "(555) 111-2233",
    "branchId": 1
}
# Endpoint: Update an Employee
## Method: PUT

URL: /api/v1/employees/{id}

Request Example (Body):

**typescript**

const updatedEmployee = {
    name: "Alice Johnson",
    position: "Senior Designer",
    department: "Marketing",
    email: "alice.johnson@newemail.com",
    phone: "(555) 111-4455",
    branchId: 1,
};

fetch("http://localhost:3000/api/v1/employees/3", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
    body: JSON.stringify(updatedEmployee),
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
Response Example (Status 200 OK):

**json**

{
    "id": "3",
    "name": "Alice Johnson",
    "position": "Senior Designer",
    "department": "Marketing",
    "email": "alice.johnson@newemail.com",
    "phone": "(555) 111-4455",
    "branchId": 1
}
# Endpoint: Delete an Employee

## Method: DELETE

URL: /api/v1/employees/{id}

Request Example (No body required):

**typescript**

fetch("http://localhost:3000/api/v1/employees/3", {
    method: "DELETE",
    headers: {
        "Authorization": "Bearer YOUR_TOKEN_HERE",
    },
})
    .then((response) => {
        if (response.ok) {
            console.log("Employee deleted successfully");
        } else {
            console.error("Error deleting employee");
        }
    })
    .catch((error) => console.error("Error:", error));

Response Example (Status 204 No Content):

No response body on success.

# Secure Setup Instructions

## API keys and environment variables.

Do not commit. .gitignore both files and enter your api info in .env files, it will automatically connect. Place .env in root directory.

## Example(This is mock )

FIREBASE_PROJECT_ID=branch-list-directory
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ndfgvdfgvdfvdfvdfvdfvdfvdfvdfvdfv\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@branch-list-directory.iam.gserviceaccount.com


