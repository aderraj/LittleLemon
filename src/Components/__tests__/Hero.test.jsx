import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../Hero';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Hero Component', () => {
  test('renders with all props', () => {
    renderWithRouter(
      <Hero
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test Description"
        buttonText="Test Button"
        buttonLink="/test"
        imageSrc="/test.png"
        imageAlt="Test Image"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  test('renders without optional props', () => {
    renderWithRouter(<Hero />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('renders button with link', () => {
    renderWithRouter(
      <Hero
        buttonText="Reserve Now"
        buttonLink="/reservations"
      />
    );

    const button = screen.getByText('Reserve Now');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/reservations');
  });

  test('renders button with onClick handler', () => {
    const handleClick = jest.fn();
    renderWithRouter(
      <Hero
        buttonText="Click Me"
        onButtonClick={handleClick}
      />
    );

    const button = screen.getByText('Click Me');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('uses default alt text for image when not provided', () => {
    renderWithRouter(
      <Hero imageSrc="/test.png" />
    );

    expect(screen.getByAltText('Hero image')).toBeInTheDocument();
  });
});
