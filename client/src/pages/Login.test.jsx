import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login.jsx';
import api from '../services/api';

// Mock the AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    login: vi.fn(),
  })),
}));

// Mock the API service
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

// Helper to render component with router
const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('LoginForm Interaction Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows user to type in email and password fields', async () => {
    // 1. Setup userEvent
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // 2. Simulate typing
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'securepassword123');

    // 3. Assert correct values
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('securepassword123');
  });

  it('submits the form successfully with valid inputs', async () => {
    const user = userEvent.setup();
    renderLogin();

    // Setup mock response for API
    api.post.mockResolvedValueOnce({
      status: 200,
      data: { user: { id: 1, name: 'Test User' }, token: 'fake-token' },
    });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Type credentials
    await user.type(emailInput, 'valid@email.com');
    await user.type(passwordInput, 'validpassword');

    // Click submit
    await user.click(submitButton);

    // Assert the mock API submission handler was called
    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'valid@email.com',
      password: 'validpassword',
    });
  });

  it('shows an error and prevents submission when fields are empty', async () => {
    const user = userEvent.setup();
    renderLogin();

    const submitButton = screen.getByRole('button', { name: /login/i });

    // Click submit without filling fields
    await user.click(submitButton);

    // Assert that an error message appears (error state span)
    const emailError = screen.getByText(/email is required/i);
    expect(emailError).toBeInTheDocument();

    // Assert that the mock submission handler was NOT called
    expect(api.post).not.toHaveBeenCalled();
  });
});
