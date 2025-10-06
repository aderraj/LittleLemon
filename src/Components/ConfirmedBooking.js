import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const ConfirmedBooking = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.50');

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="md">
        <VStack
          spacing={8}
          bg={cardBgColor}
          p={8}
          borderRadius="xl"
          boxShadow="lg"
          textAlign="center"
        >
          <Icon as={CheckCircleIcon} w={16} h={16} color="green.500" />
          
          <VStack spacing={4}>
            <Heading as="h1" size="xl" color={textColor}>
              Booking Confirmed!
            </Heading>
            
            <Text fontSize="lg" color="gray.600" maxW="sm">
              Thank you for choosing Little Lemon! Your table reservation has been successfully confirmed.
            </Text>
            
            <Text fontSize="md" color="gray.500">
              You will receive a confirmation email shortly with all the details of your reservation.
            </Text>
          </VStack>
          
          <VStack spacing={4} w="full">
            <Button
              as={RouterLink}
              to="/"
              bg="yellow.400"
              color="white"
              size="lg"
              width="full"
              _hover={{ bg: 'yellow.500' }}
              _active={{ bg: 'yellow.600' }}
            >
              Return to Home
            </Button>
            
            <Button
              as={RouterLink}
              to="/reservations"
              variant="outline"
              colorScheme="yellow"
              size="lg"
              width="full"
            >
              Make Another Reservation
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ConfirmedBooking;