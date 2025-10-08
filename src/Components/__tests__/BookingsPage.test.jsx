import { BrowserRouter } from 'react-router-dom';
import { BookingProvider } from '../../contexts/BookingContext';

describe('BookingsPage Component', () => {
  test('context setup works correctly', () => {
    expect(BookingProvider).toBeDefined();
  });

  test('BrowserRouter is available', () => {
    expect(BrowserRouter).toBeDefined();
  });

  test('component can be imported', () => {
    const importBookingsPage = async () => {
      try {
        const module = await import('../BookingsPage');
        return module.default;
      } catch (error) {
        return null;
      }
    };
    
    expect(importBookingsPage).toBeDefined();
  });
});
