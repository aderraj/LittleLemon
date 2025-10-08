import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('HomePage Component', () => {
  test('renders main element', () => {
    renderWithRouter(<HomePage />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders hero section with Little Lemon title', () => {
    renderWithRouter(<HomePage />);
    const titles = screen.getAllByText('Little Lemon');
    expect(titles.length).toBeGreaterThan(0);
    const chicagos = screen.getAllByText('Chicago');
    expect(chicagos.length).toBeGreaterThan(0);
  });

  test('renders reserve a table button', () => {
    renderWithRouter(<HomePage />);
    const buttons = screen.getAllByText('Reserve a Table');
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0].closest('a')).toHaveAttribute('href', '/reservations');
  });

  test('renders all main sections', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
