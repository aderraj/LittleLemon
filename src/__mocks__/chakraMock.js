jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  ChakraProvider: ({ children }) => children,
  useColorModeValue: (light, dark) => light,
}));

jest.mock('@chakra-ui/icons', () => ({
  CalendarIcon: () => 'CalendarIcon',
  TimeIcon: () => 'TimeIcon',
  ChevronDownIcon: () => 'ChevronDownIcon',
}));
