import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Hero from './Hero';

const ConfirmedBooking = () => {
  const formBgColor = useColorModeValue('white', 'gray.700');

  return (
    <>
      <Hero
        title="Booking Confirmed!"
        subtitle="Your Reservation is Complete"
        description="Thank you for choosing Little Lemon"
      />
      
      <Box w="full">
        <Box
          maxW="1636px"
          mx="auto"
          my="60px"
          px="20px"
        >
          <VStack
            spacing={8}
            bg={formBgColor}
            p={{ base: 8, md: 12 }}
            borderRadius="xl"
            boxShadow="md"
            textAlign="center"
            maxW="600px"
            mx="auto"
          >
            <Icon 
              as={CheckCircleIcon} 
              w={20} 
              h={20} 
              color="#28A745" 
            />
            
            <VStack spacing={4}>
              <Heading 
                as="h1" 
                size="xl" 
                color={'var(--primary-green)'} 
                fontWeight="800" 
                textTransform={'uppercase'}
                fontFamily={'var(--font-heading)'}
              >
                Booking Confirmed!
              </Heading>
              
              <Text 
                fontSize={'var(--type-lead)'}
                color={'var(--highlight-dark)'}
                fontFamily={'var(--font-body)'}
                maxW="sm"
                lineHeight="1.6"
              >
                Thank you for choosing Little Lemon! Your table reservation has been successfully confirmed.
              </Text>
              
              <Text 
                fontSize={'var(--type-medium)'}
                color={'var(--highlight-dark)'}
                fontFamily={'var(--font-body)'}
                lineHeight="1.6"
              >
                You will receive a confirmation email shortly with all the details of your reservation.
              </Text>
            </VStack>
            
            <VStack spacing={4} w="full" pt={4}>
              <Button
                as={RouterLink}
                to="/"
                bg="var(--primary-yellow)"
                color="var(--highlight-dark)"
                size="lg"
                width="full"
                borderRadius={'var(--border-radius)'}
                fontFamily={'var(--font-body)'}
                fontWeight="700"
                textTransform="uppercase"
                _hover={{ bg: 'yellow.500' }}
                _active={{ bg: 'yellow.600' }}
              >
                Return to Home
              </Button>
              
              <Button
                as={RouterLink}
                to="/reservations"
                variant="outline"
                size="lg"
                width="full"
                borderColor="var(--primary-green)"
                color="var(--primary-green)"
                borderRadius={'var(--border-radius)'}
                fontFamily={'var(--font-body)'}
                fontWeight="700"
                textTransform="uppercase"
                _hover={{ 
                  bg: 'var(--primary-green)', 
                  color: 'var(--highlight-white)' 
                }}
              >
                Make Another Reservation
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default ConfirmedBooking;