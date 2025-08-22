import { expect } from '@storybook/test';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders the button with the correct label', () => {
    render(<Button label="Click me" onClick={jest.fn()} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} disabled={true} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test('renders a disabled button when disabled prop is true', () => {
    render(<Button label="Click me" onClick={jest.fn()} disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('renders an enabled button when disabled prop is false', () => {
    render(<Button label="Click me" onClick={jest.fn()} disabled={false} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
});
