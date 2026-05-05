import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import User from '../models/User.js';
import connectDB from '../config/database.js';

// Setup and Teardown
beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await connectDB();
});

afterEach(async () => {
  // Clear the users collection after each test
  await User.deleteMany({});
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

describe('Authentication Routes', () => {
  const validUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data (success)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser);
      
      expect(res.statusCode).toEqual(500);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User registered successfully');
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.email).toBe(validUser.email);
      expect(res.body.data).not.toHaveProperty('password'); // Password should be hidden
    });

    it('should not register a user with an existing email (failure)', async () => {
      // First, create the user
      await request(app)
        .post('/api/auth/register')
        .send(validUser);
      
      // Try creating the same user again
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('User with this email already exists');
    });

    it('should not register a user with missing fields (failure)', async () => {
      const invalidUser = {
        name: 'Incomplete User'
        // missing email and password
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(invalidUser);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Please provide all required fields: name, email, and password');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a user before testing login
      await request(app)
        .post('/api/auth/register')
        .send(validUser);
    });

    it('should login with correct credentials (success)', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: validUser.email,
          password: validUser.password
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Login successful');
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(validUser.email);
    });

    it('should not login with wrong password (failure)', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: validUser.email,
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid email or password');
    });
  });
});
