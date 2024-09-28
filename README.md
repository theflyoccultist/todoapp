# Todo List API Project

  

## Overview

  

This project is a Todo List API that allows users to manage their personal to-do lists. It features a backend implemented with Node.js and Express, while the frontend is built using plain JavaScript and HTML. The application persists data using a MySQL database and includes full CRUD functionality for managing tasks.

  

## Features


 - **Persisting Data:** The application uses a MySQL database to persist user data and tasks. Each user's to-do list is unique and cannot be accessed by others.

  

 - **CRUD Implementation:** The backend provides full CRUD (Create, Read, Update, Delete) functionality, allowing users to manage their tasks effectively.

  

 - **Authentication:**
	 - **Register:** Users can create a new account. Passwords are securely hashed using bcrypt.

	 - **Login:** Users can log in to their account, generating a JWT (JSON Web Token) for session management.

	 - **Logout:** Users can log out, which effectively ends their session on the frontend.
	- **Error Handling:** The application includes comprehensive error handling to ensure smooth user experience and proper response messages for different error scenarios.
	-	**Secure Access:** Only registered and logged-in users can access the to-do list. Each user's tasks are stored and managed individually, ensuring privacy and security.

  

## Technologies Used

  

-	**Backend:** Node.js, Express

-	**Frontend:** Plain JavaScript, HTML

-	**Database:** MySQL

-	**Authentication:** JWT (JSON Web Token), bcrypt for password hashing

-	**Environment Variables:** .env file is used for configuration settings

  

## Setup Instructions

To run this project on your local machine:

 1. **Clone the Repository:**

  

```bash
git clone https://github.com/theflyoccultist/todoapp_express_mysql

cd <repository_directory>
```

 2. **Install Dependencies:**

```bash
npm install
```
  

 3. **Setup MySQL Database:**
 
 - Create a MySQL database for the project.

- Run the provided SQL script "schema.sql" to set up the necessary tables.

- Ensure your MySQL server is running.


4. **Configure Environment Variables:**

 - Rename the .env.example file to .env.

 - Fill in the .env file with your own database credentials, JWT secret, and any other necessary configurations.

Example .env file:

```makefile
MYSQl_HOST=localhost

MYSQl_USER=root

MYSQl_PASSWORD=your_password

MYSQl_DATABASE=todolist

ACCESS_TOKEN_SECRET=your_jwt_secret
```
  

5. **Run the Project:**

```bash
npm start
```
 
6. **Access the Application:**

 - Open the frontend in your browser (e.g., index.html).

 - Use tools like Postman or cURL to interact with the API.


## API Endpoints

  

 - **Register:** POST /auth/register - Creates a new user account.

 - **Login:** POST /auth/login - Logs in a user and returns a JWT.

 - **Logout:** Managed on the frontend by removing the token from localStorage.

 - **Get Tasks:** GET /api/tasks - Retrieves the user's tasks (authentication required).

 - **Create Task:** POST /api/tasks - Creates a new task (authentication required).

 - **Update Task:** PUT /api/tasks/:id - Updates an existing task (authentication required).

 - **Delete Task:** DELETE /api/tasks/:id - Deletes a task (authentication required).

 
## Important Notes

  
 - **Environment Variables:** Ensure the .env file is correctly configured with your database credentials and JWT secret.

 - **Unique Task Lists:** Each user has their own unique task list, and tasks are not shared between users.

  

## License

This project is licensed under the MIT License. See the LICENSE file for details.
