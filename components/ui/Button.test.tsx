import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders label correctly', () => {
    render(<Button label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /click/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies correct variant classes', () => {
    render(<Button label="Primary" variant="primary" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-500');
  });
});
