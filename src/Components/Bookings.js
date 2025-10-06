import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  useColorModeValue,
  Badge,
  Divider,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Hero from './Hero';
import { useBookings } from '../contexts/BookingContext';

const Bookings = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.50');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

  // Get bookings from context
  const { bookings, deleteBooking } = useBookings();

  // Handle booking cancellation
  const handleCancelBooking = (bookingId, bookingNumber) => {
    if (window.confirm(`Are you sure you want to cancel booking ${bookingNumber}?`)) {
      deleteBooking(bookingId);
      // You could also call an API here to cancel on the server
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'completed':
        return 'blue';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <>
      <Hero 
        title="My Bookings"
        subtitle="Manage Your Reservations"
        description="View your current and past reservations at Little Lemon"
      />
      <Box bg={bgColor} minH="100vh" py={8}>
        <Container maxW="6xl">
          <VStack spacing={8} align="stretch">
            <HStack justify="space-between" align="center" flexWrap="wrap">
              <VStack align="start" spacing={2}>
                <Heading as="h2" size="lg" color={textColor}>
                  Your Reservations
                </Heading>
                <Text color={mutedTextColor}>
                  {bookings.length} reservation{bookings.length !== 1 ? 's' : ''} found
                </Text>
              </VStack>
              <Button
                as={RouterLink}
                to="/reservations"
                bg="yellow.400"
                color="white"
                size="lg"
                _hover={{ bg: 'yellow.500' }}
                _active={{ bg: 'yellow.600' }}
              >
                Make New Reservation
              </Button>
            </HStack>

            <Divider />

            {bookings.length === 0 ? (
              <Card bg={cardBgColor} textAlign="center" py={12}>
                <CardBody>
                  <VStack spacing={6}>
                    <Icon as={CalendarIcon} w={12} h={12} color="gray.400" />
                    <VStack spacing={2}>
                      <Heading as="h3" size="md" color={textColor}>
                        No Reservations Found
                      </Heading>
                      <Text color={mutedTextColor}>
                        You haven't made any reservations yet. Book your table today!
                      </Text>
                    </VStack>
                    <Button
                      as={RouterLink}
                      to="/reservations"
                      bg="yellow.400"
                      color="white"
                      size="lg"
                      _hover={{ bg: 'yellow.500' }}
                    >
                      Make Your First Reservation
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {bookings.map((booking) => (
                  <Card key={booking.id} bg={cardBgColor} boxShadow="md" _hover={{ boxShadow: 'lg' }}>
                    <CardHeader pb={2}>
                      <HStack justify="space-between" align="start">
                        <VStack align="start" spacing={1}>
                          <Text fontSize="sm" color={mutedTextColor} fontWeight="medium">
                            Booking #{booking.bookingNumber}
                          </Text>
                          <Badge colorScheme={getStatusColor(booking.status)} variant="subtle">
                            {formatStatus(booking.status)}
                          </Badge>
                        </VStack>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={4}>
                        <VStack align="start" spacing={2} w="full">
                          <HStack>
                            <Icon as={CalendarIcon} color="yellow.500" />
                            <Text fontWeight="medium" color={textColor}>
                              {booking.date}
                            </Text>
                          </HStack>
                          <HStack>
                            <Icon as={TimeIcon} color="yellow.500" />
                            <Text fontWeight="medium" color={textColor}>
                              {booking.time}
                            </Text>
                          </HStack>
                          <HStack>
                            <Text color={mutedTextColor} fontSize="sm">
                              Guests:
                            </Text>
                            <Text fontWeight="medium" color={textColor}>
                              {booking.guests} {booking.guests === 1 ? 'person' : 'people'}
                            </Text>
                          </HStack>
                          <HStack>
                            <Text color={mutedTextColor} fontSize="sm">
                              Occasion:
                            </Text>
                            <Text fontWeight="medium" color={textColor}>
                              {booking.occasion}
                            </Text>
                          </HStack>
                        </VStack>

                        <Divider />

                        <HStack spacing={2} w="full">
                          {booking.status === 'confirmed' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                colorScheme="yellow"
                                flex={1}
                              >
                                Modify
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                colorScheme="red"
                                flex={1}
                                onClick={() => handleCancelBooking(booking.id, booking.bookingNumber)}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme="blue"
                              flex={1}
                            >
                              View Details
                            </Button>
                          )}
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            )}

            <Box textAlign="center" mt={8}>
              <VStack spacing={4}>
                <Text color={mutedTextColor}>
                  Want to make another reservation?
                </Text>
                <Button
                  as={RouterLink}
                  to="/reservations"
                  bg="yellow.400"
                  color="white"
                  size="lg"
                  _hover={{ bg: 'yellow.500' }}
                  _active={{ bg: 'yellow.600' }}
                >
                  Book Another Table
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default Bookings;