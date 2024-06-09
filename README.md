# MUI Auth Template

## Overview

The MUI Auth Template is a comprehensive full-stack authentication solution built with modern web development technologies. The frontend is developed using React and Material-UI (MUI), providing a sleek and responsive user interface. The backend is powered by Node.js and Express, ensuring robust and scalable server-side operations. This template includes essential features such as user registration, login, password reset, and email verification, making it an ideal starting point for any web application requiring user authentication.

## How It Works

### Client

The client-side of the application is built with React, utilizing Material-UI for a consistent and professional design. It includes various views for authentication, such as login, signup, password reset, and email verification. These views interact with the backend API using Axios for HTTP requests. The client also leverages custom hooks to manage authentication states and form submissions efficiently.

Key components and hooks include:
- **Login and Signup Forms**: Handle user input and validation, sending requests to the server for authentication.
- **Password Reset and Verification**: Allow users to reset their passwords and verify their email addresses through secure links.
- **Custom Hooks**: `useAxiosPost`, `useCurrentUser`, `useLogout`, and `useValidate` manage API calls, user state, and form validation.

### Server

The server-side is built with Node.js and Express, providing a robust API for the client. It connects to a MongoDB database to store user information securely. The server implements various middlewares for enhanced security and performance, such as CORS handling, rate limiting, and logging. Key server functionalities include:
- **User Authentication**: Controllers handle user registration, login, token generation, and session management.
- **Database Connection**: Configured to connect to a MongoDB instance, ensuring data persistence and reliability.
- **Security Middleware**: Includes error handling, rate limiting, and session verification to protect the API from malicious activities.

## .env Configuration

### Client

Create a `.env` file in the `client` directory with the following variables:

API=/api

- `API`: The URL for your api.

### Server

Create a `.env` file in the `server` directory with the following variables:

URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/auth_template
MODE=DEV
TOKEN_SECRET=token

- `URL`: URL for emails being sent
- `MONGO_URI`: The URI for connecting to your MongoDB database.
- `MODE`: DEV mode sends emails all to personal for testing purposes.
- `TOKEN_SECRET`: The token used for session generation

## Proxy Configuration

To enable the client to communicate with the server without CORS issues, you need to set up a proxy in the `client/package.json` file. Add the following line to the `package.json` file:

"proxy": "http://localhost:3001"

This configuration ensures that API requests from the client are proxied to the server, allowing seamless communication between the front end and back end.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running locally or in the cloud.

### Installation

1. Clone the repository:

    git clone https://github.com/dantewins/mui-auth-template.git

2. Install dependencies for both client and server:

    cd mui-auth-template/client
    npm install
    cd ../server
    npm install

3. Set up your `.env` files as described above.

### Running the Application

1. Start the server:

    cd server
    npm run server

2. Start the client:

    cd client
    npm run start

Your application should now be running with the client available at `http://localhost:3000` and the server at `http://localhost:3001`.

## License

This project is licensed under the Creative Commons Zero v1.0 Universal License.
