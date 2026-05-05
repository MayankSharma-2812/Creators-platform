# Creators Platform
![CI Status](https://github.com/MayankSharma-2812/Creators-platform/actions/workflows/ci.yml/badge.svg)

This project now uses GitHub Actions for Continuous Integration.

# Creators Platform - MERN Full-Stack Application

A complete full-stack web application with user authentication, content management, and CRUD operations. This project demonstrates the integration of React frontend with Express/MongoDB backend using JWT-based authentication.

## 🚀 Features

- **User Authentication**: Registration, login, logout with JWT tokens
- **Protected Routes**: Frontend and backend route protection
- **Content Management**: Create, read, update, delete posts
- **Authorization**: Users can only modify their own content
- **Pagination**: Scalable content listing with pagination
- **Real-time Validation**: Client-side form validation
- **Error Handling**: Comprehensive error management
- **Responsive Design**: Modern, mobile-friendly UI
- **State Management**: React Context for global auth state

## 🛠 Technology Stack

### Frontend
- **React 19** - UI framework with hooks and context
- **React Router v7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Vite** - Build tool and development server
- **CSS3** - Styling with modern techniques

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account or local MongoDB installation

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd creators-platform
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
cd server
npm install
```

#### Frontend Dependencies
```bash
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment Variables
Create `server/.env` file:
```env
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
PORT=5000
NODE_ENV=development
```

#### Client Environment Variables
Create `client/.env` file:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the Application

#### Start Backend Server
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

#### Start Frontend Client
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

## 📁 Project Structure

```
creators-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── common/     # ProtectedRoute, LoadingSpinner
│   │   │   └── layout/     # Header, Footer
│   │   ├── context/        # AuthContext for global state
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── EditPost.jsx
│   │   ├── services/       # API configuration
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── postController.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js         # JWT authentication
│   ├── models/            # Mongoose models
│   │   └── User.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── postRoutes.js
│   ├── config/            # Database configuration
│   │   └── database.js
│   ├── server.js          # Server entry point
│   └── package.json
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email and password
2. **Login**: Credentials verified, JWT token generated and stored
3. **Protected Access**: Token automatically included in API requests
4. **Authorization**: Backend validates token and user permissions
5. **Logout**: Token cleared and user redirected to login

## 🛡 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Route Protection**: Both frontend and backend protection
- **Ownership Validation**: Users can only modify their own content
- **Environment Variables**: Sensitive data excluded from code
- **Input Validation**: Client and server-side validation
- **CORS Configuration**: Proper cross-origin resource sharing

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get user profile (protected)
- `PUT /api/users/:id` - Update user profile (protected)

### Posts
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts` - Get user posts with pagination (protected)
- `GET /api/posts/:id` - Get single post (protected)
- `PUT /api/posts/:id` - Update post (protected, owner only)
- `DELETE /api/posts/:id` - Delete post (protected, owner only)

## 🎯 User Journey

1. **Register** → Create new account
2. **Login** → Authenticate and receive JWT token
3. **Dashboard** → View personal content and statistics
4. **Create Post** → Add new content
5. **View Posts** → Browse paginated content list
6. **Edit Post** → Modify existing content
7. **Delete Post** → Remove content with confirmation
8. **Logout** → Clear session and exit

## 🔧 Development Features

### Frontend
- **React Context API**: Global authentication state
- **React Router**: Protected and public routes
- **Axios Interceptors**: Automatic token handling
- **Form Validation**: Real-time client-side validation
- **Loading States**: Professional loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Mobile-first approach

### Backend
- **Express Middleware**: Custom authentication middleware
- **Mongoose Models**: Structured data models with validation
- **Error Handling**: Centralized error management
- **JWT Verification**: Secure token validation
- **Pagination**: Scalable data fetching
- **CORS Support**: Cross-origin request handling

## 🚨 Error Handling

### Backend Errors
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (no/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (resource doesn't exist)
- **500**: Internal Server Error

### Frontend Errors
- **Network Errors**: Connection issues handled gracefully
- **Validation Errors**: Field-specific error messages
- **Authentication Errors**: Automatic redirect to login
- **API Errors**: User-friendly error notifications

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎓 Learning Objectives

This project demonstrates mastery of:
- Full-stack MERN development
- JWT authentication and authorization
- Protected routing and middleware
- CRUD operations with database integration
- Client-server communication
- Error handling and validation
- Modern React patterns
- RESTful API design
- Security best practices

## 🚀 Deployment Notes

For production deployment:
1. Set production environment variables
2. Build frontend: `npm run build`
3. Configure production database
4. Set up CORS for production domain
5. Implement proper logging
6. Add rate limiting and security headers

---

**Built with ❤️ using modern web technologies**
