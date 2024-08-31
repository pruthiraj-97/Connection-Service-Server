Here's the complete README file including all the details about your server-side API:

---

# Server-Side API

## Overview

This server-side API is built with TypeScript, Node.js, Express.js, and MongoDB. It handles user authentication with JWT tokens and provides endpoints for managing user connections and interactions.

## Tech Stack

- **TypeScript**: Provides static typing for improved development and maintenance.
- **Node.js**: The runtime environment for executing JavaScript on the server.
- **Express.js**: A minimalist web framework for Node.js, used for building the API.
- **MongoDB**: A NoSQL database used for storing user data.
- **JWT (JSON Web Tokens)**: Used for secure user authentication.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pruthiraj-97/Connection-Service-Server
   cd Connection-Service-Server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** with the following environment variables:
   ```env
   PORT=3005
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

## API Endpoints

### 1. **Get Connection Chain**

- **Endpoint**: `api/v1/connection/connect`
- **Method**: `GET`
- **Description**: Finds all possible connection paths between two users.
- **Query Parameters**:
  - `source`: The name of the source user.
  - `destination`: The name of the destination user.
- **Example URL**: `http://localhost:3005/api/v1/connection/connect?source=John&destination=Jane`
- **Response**:
  ```json
  {
    "status": 200,
    "data": [
      [
        {"_id": "user1_id", "name": "John"},
        {"_id": "user2_id", "name": "Friend1"},
        {"_id": "user3_id", "name": "Jane"}
      ],
      ...
    ],
    "error": null
  }
  ```
  - `data`: An array of arrays where each inner array represents a connection path from the source user to the destination user.
  - Each object in the array contains `_id` and `name` of the user.

### 2. **Get All Users**

- **Endpoint**: `api/v1/connection/users`
- **Method**: `GET`
- **Description**: Retrieves all registered users in the system.
- **Example URL**: `http://localhost:3005/api/v1/connection/users`
- **Response**:
  ```json
  {
    "status": 200,
    "data": [
      {"_id": "user1_id", "name": "John", "email": "john@example.com"},
      {"_id": "user2_id", "name": "Jane", "email": "jane@example.com"}
    ],
    "error": null
  }
  ```
  - `data`: An array of user objects with `_id`, `name`, and `email`.

### 3. **User Login**

- **Endpoint**: `api/v1/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": 200,
    "data": {
      "token": "your_jwt_token_here",
      "user":"user details"
    },
    "error": null
  }
  ```
  - `data.token`: The JWT token used for authentication.

### 4. **User Registration**

- **Endpoint**: `api/v1/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": 200,
    "data": {
      "message": "User registered successfully"
    },
    "error": null
  }
  ```
  - `data.message`: Confirmation message for successful registration.

### 5. **Follow a User**

- **Endpoint**: `api/v1/connection/follow/:userId`
- **Method**: `POST`
- **Description**: Allows a user to follow another user.
- **URL Parameter**:
  - `userId`: The ID of the user to be followed.
- **Request Headers**:
  - `x-access-token`: JWT token for authentication.
- **Example URL**: `http://localhost:3005/api/v1/connection/follow/60d5c74f8d6d3b001f647c9f`
- **Response**:
  ```json
  {
    "status": 200,
    "data": {
      "message": "Followed successfully"
    },
    "error": null
  }
  ```
  - `data.message`: Confirmation message for a successful follow action.

## Error Handling

All endpoints handle errors by returning appropriate HTTP status codes and error messages. The response format for errors is as follows:

```json
{
  "status": 400,
  "data": null,
  "error": {
    "message": "Error message here"
  }
}
```