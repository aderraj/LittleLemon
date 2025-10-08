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
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.50');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

  const { bookings, deleteBooking } = useBookings();

  const handleCancelBooking = (bookingId, bookingNumber) => {
    if (window.confirm(`Are you sure you want to cancel booking ${bookingNumber}?`)) {
      deleteBooking(bookingId);
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
      <Box minH="100vh" py={8}>
        <Container maxW="1636px" h="full">
          <VStack spacing={8} align="stretch" h="full">
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
                borderRadius={'var(--border-radius)'}
              >
                Make New Reservation
              </Button>
            </HStack>

            <Divider />

            {bookings.length === 0 ? (
              <Box flex={1} h="full" py={8} >
                <Card
                  bg={'var(--highlight-white)'} 
                  py={12} 
                  w="full" 
                  h="full"
                  borderRadius={'var(--border-radius)'}
                  boxShadow="lg"
                >
                  <CardBody display="flex" alignItems="center" justifyContent="center" h="full">
                    <VStack spacing={6} justify="center" textAlign="center">
                      <Icon as={CalendarIcon} w={16} h={16} color="gray.400" />
                      <VStack spacing={3} textAlign="center">
                        <Heading as="h3" size="lg" color={textColor}>
                          No Reservations Found
                        </Heading>
                        <Text color={mutedTextColor} fontSize="lg" maxW="400px">
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
                        borderRadius={'var(--border-radius)'}
                        mt={4}
                      >
                        Make Your First Reservation
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </Box>
            ) : (
              <Box 
                display="flex" 
                flexWrap="wrap" 
                justifyContent="center" 
                gap={{ base: 4, md: 6, lg: 8 }}
                maxW="1400px"
                mx="auto"
                px={{ base: 4, md: 6, lg: 8 }}
              >
                {bookings.map((booking) => (
                  <Card 
                    key={booking.id} 
                    bg={'var(--highlight-white)'} 
                    boxShadow="lg" 
                    _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
                    borderRadius={'var(--border-radius)'}
                    border="1px solid"
                    borderColor={'var(--secondary-beige)'}
                    transition="all 0.2s ease-in-out"
                    w={{ base: "100%", sm: "450px", md: "430px", lg: "410px", xl: "430px" }}
                    minW={{ base: "320px", md: "410px" }}
                    maxW="550px"
                    h="auto"
                    minH="380px"
                    flex="0 0 auto"
                    p={7}
                  >
                    <CardHeader pb={4}>
                      <HStack justify="space-between" align="flex-start" w="full">
                        <Text 
                          fontSize={'var(--type-medium)'} 
                          color={'var(--primary-green)'} 
                          fontWeight="700" 
                          fontFamily={'var(--font-body)'}
                          textTransform="uppercase"
                          letterSpacing="0.5px"
                          flex="1"
                        >
                          Booking #{booking.bookingNumber}
                        </Text>
                        <Badge 
                          colorScheme={getStatusColor(booking.status)} 
                          variant="subtle"
                          borderRadius={'var(--border-radius)'}
                          fontSize={'var(--type-small)'}
                          px={3}
                          py={1.5}
                          fontFamily={'var(--font-body)'}
                          fontWeight="700"
                          ml={3}
                        >
                          {formatStatus(booking.status)}
                        </Badge>
                      </HStack>
                    </CardHeader>
                    <CardBody pt={0}>
                      <VStack align="start" spacing={5}>
                        <VStack align="start" spacing={4} w="full">
                          <HStack spacing={4} align="center">
                            <Box minW="20px" display="flex" justifyContent="center">
                              <Icon as={CalendarIcon} color={'var(--primary-yellow)'} w={5} h={5} />
                            <Text 
                              fontWeight="400" 
                              color={'var(--highlight-dark)'} 
                              fontFamily={'var(--font-body)'} 
                              fontSize={'var(--type-medium)'}
                              lineHeight={'var(--type-medium)'}
                            >
                              {booking.date}
                            </Text>
                            </Box>
                          </HStack>
                          <HStack spacing={4} align="center">
                            <Box minW="20px" display="flex" justifyContent="center">
                              <Icon as={TimeIcon} color={'var(--primary-yellow)'} w={5} h={5} />
                            <Text 
                              fontWeight="400" 
                              color={'var(--highlight-dark)'} 
                              fontFamily={'var(--font-body)'} 
                              fontSize={'var(--type-medium)'}
                              lineHeight={'var(--type-medium)'}
                            >
                              {booking.time}
                            </Text>
                            </Box>
                          </HStack>
                          <HStack spacing={4} align="center">
                            <Box minW="70px">
                              <Text 
                                color={'var(--primary-green)'} 
                                fontSize={'var(--type-base-rem)'} 
                                fontFamily={'var(--font-body)'} 
                                fontWeight="700"
                                lineHeight={'var(--type-base-rem)'}
                              >
                                Guests:
                              </Text>
                            </Box>
                            <Text 
                              fontWeight="400" 
                              color={'var(--highlight-dark)'} 
                              fontFamily={'var(--font-body)'} 
                              fontSize={'var(--type-medium)'}
                              lineHeight={'var(--type-medium)'}
                            >
                              {booking.guests} {booking.guests === 1 ? 'person' : 'people'}
                            </Text>
                          </HStack>
                          <HStack spacing={4} align="center">
                            <Box minW="70px">
                              <Text 
                                color={'var(--primary-green)'} 
                                fontSize={'var(--type-base-rem)'} 
                                fontFamily={'var(--font-body)'} 
                                fontWeight="700"
                                lineHeight={'var(--type-base-rem)'}
                              >
                                Occasion:
                              </Text>
                            </Box>
                            <Text 
                              fontWeight="400" 
                              color={'var(--highlight-dark)'} 
                              fontFamily={'var(--font-body)'} 
                              fontSize={'var(--type-medium)'}
                              lineHeight={'var(--type-medium)'}
                              textTransform="capitalize"
                            >
                              {booking.occasion}
                            </Text>
                          </HStack>
                        </VStack>

                        <Divider borderColor={'var(--secondary-beige)'} />

                        <HStack spacing={3} w="full">
                          {booking.status === 'confirmed' && (
                            <>
                              <Button
                                size="md"
                                variant="outline"
                                borderColor={'var(--primary-yellow)'}
                                color={'var(--primary-green)'}
                                _hover={{ bg: 'var(--primary-yellow)', color: 'var(--highlight-dark)' }}
                                borderRadius={'var(--border-radius)'}
                                fontFamily={'var(--font-body)'}
                                fontWeight="700"
                                fontSize={'var(--type-base-rem)'}
                                textTransform="uppercase"
                                px={4}
                                py={2}
                                flex={1}
                              >
                                Modify
                              </Button>
                              <Button
                                size="md"
                                variant="outline"
                                borderColor="red.400"
                                color="red.500"
                                _hover={{ bg: 'red.50', borderColor: 'red.500' }}
                                borderRadius={'var(--border-radius)'}
                                fontFamily={'var(--font-body)'}
                                fontWeight="700"
                                fontSize={'var(--type-base-rem)'}
                                textTransform="uppercase"
                                px={4}
                                py={2}
                                flex={1}
                                onClick={() => handleCancelBooking(booking.id, booking.bookingNumber)}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === 'completed' && (
                            <Button
                              size="md"
                              variant="outline"
                              borderColor={'var(--primary-green)'}
                              color={'var(--primary-green)'}
                              _hover={{ bg: 'var(--primary-green)', color: 'var(--highlight-white)' }}
                              borderRadius={'var(--border-radius)'}
                              fontFamily={'var(--font-body)'}
                              fontWeight="700"
                              fontSize={'var(--type-base-rem)'}
                              textTransform="uppercase"
                              px={4}
                              py={2}
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
              </Box>
            )}

            {bookings.length > 0 && (
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
                    borderRadius={'var(--border-radius)'}
                  >
                    Book Another Table
                  </Button>
                </VStack>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default Bookings;