import { render, screen } from '@testing-library/react';
import { UserProfile } from './UserProfile';
import userEvent from '@testing-library/user-event';

// mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe('UserProfile', () => {
  it('shows form when no user data', () => {
    render(<UserProfile />);
    expect(screen.getByText(/no user data/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add profile/i })).toBeInTheDocument();
  });

  it('allow to add profile and saves to localStorage', async () => {
    render(<UserProfile />);
    await userEvent.click(screen.getByRole('button', { name: /add profile/i }));

    const nameInput = screen.getByPlaceholderText(/name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');

    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(localStorageMock.getItem('userProfile')).toContain('John Doe');
  });
});
