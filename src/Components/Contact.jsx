import React from 'react';
import { Formik, Form, Field } from 'formik';
import Hero from './Hero';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  Textarea,
  useColorModeValue,
  Link,
  Card,
  CardBody,
  useToast,
  Icon,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, TimeIcon } from '@chakra-ui/icons';

function Contact() {
  const formBgColor = useColorModeValue('white', 'gray.700');
  const inputFocusBorderColor = useColorModeValue('yellow.400', 'yellow.300');
  const toast = useToast();

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Please enter your name';
    } else if (values.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (values.name.trim().length > 50) {
      errors.name = 'Name must be less than 50 characters';
    }

    if (!values.email) {
      errors.email = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.message) {
      errors.message = 'Please enter a message';
    } else if (values.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (values.message.trim().length > 500) {
      errors.message = 'Message must be less than 500 characters';
    }

    return errors;
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Contact form submitted:', values);
    
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us! We'll get back to you shortly.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    
    resetForm();
    setSubmitting(false);
  };

  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear from you"
        description="Questions, feedback or special requests? Send us a message and we'll get back to you shortly."
      />
      
      <Box w="full">
        <HStack
          maxW="1636px"
          mx="auto"
          my="60px"
          px="20px"
          spacing={10}
          alignItems="stretch"
          flexDir={{ base: 'column', md: 'row' }}
          minH={{ md: '60vh' }}
        >
          <VStack
            w={{ base: '100%', md: '60%' }}
            spacing={8}
            alignItems="stretch"
            justifyContent="center"
          >
            <VStack
              as={Box}
              spacing={6}
              bg={formBgColor}
              p={{ base: 6, md: 8 }}
              borderRadius="xl"
              boxShadow="md"
            >
              <VStack spacing={2} align="start" w="full">
                <Heading as="h1" size="lg" color={'var(--primary-green)'} fontWeight="800" textTransform={'uppercase'}>
                  Send a Message
                </Heading>
              </VStack>
              
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form style={{ width: '100%' }}>
                    <VStack spacing={5}>
                      <Field name="name">
                        {({ field }) => (
                          <FormControl isInvalid={errors.name && touched.name}>
                            <FormLabel
                              htmlFor="name"
                              fontWeight="bold"
                              fontFamily={'var(--font-heading)'}
                              fontSize={'var(--type-medium)'}
                              color={'var(--primary-green)'}
                            >
                              Name *
                            </FormLabel>
                            <Input
                              {...field}
                              id="name"
                              placeholder="Your name"
                              variant="filled"
                              focusBorderColor={inputFocusBorderColor}
                              color="var(--highlight-dark)"
                              fontFamily={'var(--font-body)'}
                              borderRadius="var(--border-radius)"
                              bg="var(--highlight-white)"
                              _hover={{ bg: 'var(--primary-yellow)', color: 'var(--highlight-dark)' }}
                              _focus={{ bg: 'var(--highlight-white)', color: 'var(--highlight-dark)' }}
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="email">
                        {({ field }) => (
                          <FormControl isInvalid={errors.email && touched.email}>
                            <FormLabel
                              htmlFor="email"
                              fontWeight="bold"
                              fontFamily={'var(--font-heading)'}
                              fontSize={'var(--type-medium)'}
                              color={'var(--primary-green)'}
                            >
                              Email *
                            </FormLabel>
                            <Input
                              {...field}
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              variant="filled"
                              focusBorderColor={inputFocusBorderColor}
                              color="var(--highlight-dark)"
                              fontFamily={'var(--font-body)'}
                              borderRadius="var(--border-radius)"
                              bg="var(--highlight-white)"
                              _hover={{ bg: 'var(--primary-yellow)', color: 'var(--highlight-dark)' }}
                              _focus={{ bg: 'var(--highlight-white)', color: 'var(--highlight-dark)' }}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="message">
                        {({ field }) => (
                          <FormControl isInvalid={errors.message && touched.message}>
                            <FormLabel
                              htmlFor="message"
                              fontWeight="bold"
                              fontFamily={'var(--font-heading)'}
                              fontSize={'var(--type-medium)'}
                              color={'var(--primary-green)'}
                            >
                              Message *
                            </FormLabel>
                            <Textarea
                              {...field}
                              id="message"
                              placeholder="Write your message here..."
                              rows={6}
                              variant="filled"
                              focusBorderColor={inputFocusBorderColor}
                              color="var(--highlight-dark)"
                              fontFamily={'var(--font-body)'}
                              borderRadius="var(--border-radius)"
                              bg="var(--highlight-white)"
                              _hover={{ bg: 'var(--primary-yellow)', color: 'var(--highlight-dark)' }}
                              _focus={{ bg: 'var(--highlight-white)', color: 'var(--highlight-dark)' }}
                            />
                            <FormErrorMessage>{errors.message}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Button
                        type="submit"
                        bg="var(--primary-yellow)"
                        borderRadius={'var(--border-radius)'}
                        color="var(--highlight-dark)"
                        isLoading={isSubmitting}
                        width="full"
                        size="lg"
                        mt={4}
                        _hover={{ bg: 'yellow.500' }}
                        _active={{ bg: 'yellow.600' }}
                      >
                        Send Message
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </VStack>
          </VStack>

          <VStack
            w={{ base: '100%', md: '40%' }}
            spacing={6}
            alignItems="stretch"
          >
            <Card
              bg={formBgColor}
              borderRadius="xl"
              boxShadow="md"
              p={6}
            >
              <CardBody p={0}>
                <VStack align="start" spacing={5}>
                  <Heading 
                    as="h3" 
                    size="md" 
                    color={'var(--primary-green)'} 
                    fontWeight="800"
                    textTransform={'uppercase'}
                  >
                    Contact Details
                  </Heading>
                  
                  <VStack align="start" spacing={3} w="full">
                    <HStack spacing={3}>
                      <Icon as={PhoneIcon} color={'var(--secondary-orange)'} w={5} h={5} />
                      <Text
                        fontWeight="400"
                        color={'var(--highlight-dark)'}
                        fontFamily={'var(--font-body)'}
                        fontSize={'var(--type-medium)'}
                      >
                        (123) 456-7890
                      </Text>
                    </HStack>
                    
                    <HStack spacing={3}>
                      <Icon as={EmailIcon} color={'var(--secondary-orange)'} w={5} h={5} />
                      <Link
                        href="mailto:contact@littlelemon.com"
                        fontWeight="400"
                        color={'var(--highlight-dark)'}
                        fontFamily={'var(--font-body)'}
                        fontSize={'var(--type-medium)'}
                        _hover={{ color: 'var(--primary-yellow)' }}
                      >
                        contact@littlelemon.com
                      </Link>
                    </HStack>
                    
                    <HStack spacing={3} align="start">
                      <Icon as={TimeIcon} color={'var(--secondary-orange)'} w={5} h={5} mt={1} />
                      <VStack align="start" spacing={1}>
                        <Text
                          fontWeight="700"
                          color={'var(--primary-green)'}
                          fontFamily={'var(--font-body)'}
                        >
                          Address:
                        </Text>
                        <Text
                          fontWeight="400"
                          color={'var(--highlight-dark)'}
                          fontFamily={'var(--font-body)'}
                          fontSize={'var(--type-medium)'}
                        >
                          123 Main St, Anytown, USA
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card
              bg={formBgColor}
              borderRadius="xl"
              boxShadow="md"
              p={6}
            >
              <CardBody p={0}>
                <VStack align="start" spacing={5}>
                  <Heading 
                    as="h3" 
                    size="md" 
                    color={'var(--primary-green)'} 
                    fontWeight="800"
                    textTransform={'uppercase'}
                  >
                    Opening Hours
                  </Heading>
                  
                  <VStack align="start" spacing={2} w="full">
                    <HStack justify="space-between" w="full">
                      <Text
                        fontWeight="700"
                        color={'var(--primary-green)'}
                        fontFamily={'var(--font-body)'}
                      >
                        Mon - Fri:
                      </Text>
                      <Text
                        fontWeight="400"
                        color={'var(--highlight-dark)'}
                        fontFamily={'var(--font-body)'}
                        fontSize={'var(--type-medium)'}
                      >
                        11:00 AM - 10:00 PM
                      </Text>
                    </HStack>
                    
                    <HStack justify="space-between" w="full">
                      <Text
                        fontWeight="700"
                        color={'var(--primary-green)'}
                        fontFamily={'var(--font-body)'}
                      >
                        Sat - Sun:
                      </Text>
                      <Text
                        fontWeight="400"
                        color={'var(--highlight-dark)'}
                        fontFamily={'var(--font-body)'}
                        fontSize={'var(--type-medium)'}
                      >
                        9:00 AM - 11:00 PM
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card
              bg={formBgColor}
              borderRadius="xl"
              boxShadow="md"
              p={6}
            >
              <CardBody p={0}>
                <VStack align="start" spacing={5}>
                  <Heading 
                    as="h3" 
                    size="md" 
                    color={'var(--primary-green)'} 
                    fontWeight="800"
                    textTransform={'uppercase'}
                  >
                    Follow Us
                  </Heading>
                  
                  <VStack align="start" spacing={2} w="full">
                    <Link
                      href="https://www.facebook.com/littlelemon"
                      fontWeight="400"
                      color={'var(--highlight-dark)'}
                      fontFamily={'var(--font-body)'}
                      fontSize={'var(--type-medium)'}
                      _hover={{ color: 'var(--primary-yellow)' }}
                    >
                      Facebook
                    </Link>
                    <Link
                      href="https://www.instagram.com/littlelemon"
                      fontWeight="400"
                      color={'var(--highlight-dark)'}
                      fontFamily={'var(--font-body)'}
                      fontSize={'var(--type-medium)'}
                      _hover={{ color: 'var(--primary-yellow)' }}
                    >
                      Instagram
                    </Link>
                    <Link
                      href="https://www.twitter.com/littlelemon"
                      fontWeight="400"
                      color={'var(--highlight-dark)'}
                      fontFamily={'var(--font-body)'}
                      fontSize={'var(--type-medium)'}
                      _hover={{ color: 'var(--primary-yellow)' }}
                    >
                      Twitter
                    </Link>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </HStack>
      </Box>
    </>
  );
}

export default Contact;
