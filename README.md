# Project #1: Full Stack CRUD REST API

This project contains (but is not limited to):

- Backend API with Express & MongoDB
- Routes for auth, logout, register, profile, update profile
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware
- React frontend to register, login, logout, view profile, and update profile
- React Bootstrap UI library
- React Toastify notifications

## Usage

Create a MongoDB database and obtain your MongoDB URI - MongoDB Atlas

### Env Variables

```dotenv
# Express Config
NODE_ENV=development
PORT=6000
MONGO_URI="your-mongo-uri"

#JWT
JWT_SECRET=abc123
REFRESH_TOKEN_SECRET=123abc

# AWS
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-id"
AWS_REGION="your-region"
```

The JWT secret can be changed to whatever you want.

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:6000)
npm run dev

# Run backend only
npm run server
```
