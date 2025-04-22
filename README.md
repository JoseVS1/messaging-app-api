# Wisp Backend
A robust Express-based API for a real-time messaging application with user authentication, profile management, and secure messaging functionality.

## Overview
Wisp Backend is a RESTful API built with Node.js, Express, and PostgreSQL with Prisma ORM. It provides secure user authentication, profile management, and messaging capabilities for a modern chat application.

## Features
- User Authentication: Secure signup, login, and JWT-based authorization
- Profile Management: Create and update user profiles with display names, bios, and avatars
- Messaging System: Send and retrieve messages between users
- RESTful API: Well-structured endpoints for all application features
- Database Integration: PostgreSQL database access via Prisma ORM
- Security: Password hashing with bcrypt and JWT authentication

## Technology Stack
- Backend: Node.js, Express
- Database: PostgreSQL with Prisma ORM
- Authentication: Passport.js with JWT strategy
- Security: bcrypt for password hashing, JWT for token-based auth
- Middleware: CORS for cross-origin resource sharing

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/JoseVS1/messaging-app-api.git
   cd messaging-app-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a .env file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/wisp"
   JWT_SECRET="your_jwt_secret_key"
   PORT=3000
   ```

4. Set up the database using Prisma:
   ```
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```
   npm start
   ```

## Project Structure
```
├── config
│   └── passport.js
├── controllers
│   ├── authController.js
│   ├── messageController.js
│   ├── profileController.js
│   └── userController.js
├── models
│   └── prismaClient.js
├── prisma
│   └── schema.prisma
├── routes
│   ├── apiRoutes.js
│   ├── authRoutes.js
│   ├── messageRoutes.js
│   ├── profileRoutes.js
│   └── userRoutes.js
└── app.js
```

## API Endpoints

### Authentication Routes
- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Authenticate user and receive JWT token
- GET /api/auth/logout - Log out user (requires authentication)
- GET /api/auth/me - Get current user's details (requires authentication)

### User Routes
- GET /api/users - Get all users
- GET /api/users/:id - Get specific user by ID

### Profile Routes
- GET /api/profiles/:id - Get user profile
- PUT /api/profiles/:id - Update user profile (requires authentication)

### Message Routes
- POST /api/messages - Send a new message (requires authentication)
- GET /api/messages?senderId=:id - Get conversation with specific user (requires authentication)

## Security
- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Request validation for user inputs
- Protected routes with Passport middleware

## Dependencies
- express - Web framework
- passport & passport-jwt - Authentication middleware
- bcryptjs - Password hashing
- jsonwebtoken - JWT implementation
- prisma - ORM for database operations
- cors - Cross-origin resource sharing

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
[MIT License](LICENSE)
