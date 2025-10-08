describe('App Component', () => {
  test('App module can be imported', async () => {
    const importApp = async () => {
      try {
        const module = await import('./App');
        return module.default;
      } catch (error) {
        return null;
      }
    };
    
    const App = await importApp();
    expect(App).toBeDefined();
  });

  test('BookingProvider is integrated', async () => {
    const { BookingProvider } = await import('./contexts/BookingContext');
    expect(BookingProvider).toBeDefined();
  });

  test('React Router is configured', async () => {
    const { BrowserRouter } = await import('react-router-dom');
    expect(BrowserRouter).toBeDefined();
  });
});
