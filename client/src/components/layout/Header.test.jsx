import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header.jsx';
import { vi } from 'vitest';
import * as AuthContextModule from '../../context/AuthContext.jsx';

// We mock the custom hook directly instead of providing Context
vi.mock('../../context/AuthContext.jsx', () => ({
  useAuth: vi.fn(),
}));

const renderWithRouter = (ui) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    mockLogout.mockClear();
    vi.clearAllMocks();
  });

  it('renders login and register links when not authenticated', () => {
    // Setup mock return value for this specific test
    AuthContextModule.useAuth.mockReturnValue({
      user: null,
      isAuthenticated: () => false,
      logout: mockLogout
    });

    renderWithRouter(<Header />);

    // We can use getByRole for links
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    
    // Dashboard should not be in the document
    expect(screen.queryByRole('link', { name: /dashboard/i })).not.toBeInTheDocument();
  });

  it('renders dashboard link and user greeting when authenticated', () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    
    // Setup mock return value for this specific test
    AuthContextModule.useAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: () => true,
      logout: mockLogout
    });

    renderWithRouter(<Header />);

    // Check for Dashboard link
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    
    // Check for greeting text using getByText
    expect(screen.getByText(`Hi, ${mockUser.name}`)).toBeInTheDocument();
    
    // Login and Register links should NOT be present
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
  });

  it('calls logout function when logout button is clicked', () => {
    AuthContextModule.useAuth.mockReturnValue({
      user: { name: 'Jane' },
      isAuthenticated: () => true,
      logout: mockLogout
    });

    renderWithRouter(<Header />);

    // Find the logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    // Click it
    fireEvent.click(logoutButton);

    // Verify logout function was called
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
